import { inject, injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

import { UserModel } from "../../Authentication/UserModel";
import { AuthorDto, AuthorsListDto } from "../../Core/Http/DTO/AuthorsDTO";
import { BookDto, BookListDto } from "../../Core/Http/DTO/BooksDTO";
import { HttpGateway } from "../../Core/Http/HttpGateway";
import { Types } from "../../Core/Types";

type AuthorsListPm = {
  authorId: number;
  name: string;
  latLon: string;
  bookIds: number[];
  books: BookPm[];
}[];

type BookPm = {
  bookId: number;
  name: string;
};

@injectable()
export class AuthorsRepository {
  authorsUrl = "/authors";

  bookUrl = "/book";

  @inject(Types.IHttpGateway)
  dataGateway!: HttpGateway;

  @inject(UserModel)
  userModel!: UserModel;

  authorsListPm: AuthorsListPm = [];

  constructor() {
    makeObservable(this, {
      load: action,
      authorsListPm: observable,
    });
  }

  load = async () => {
    const authorsDto: AuthorsListDto = await this.dataGateway.get(
      this.authorsUrl + `?emailOwnerId=${this.userModel.email}`
    );

    if (authorsDto.success) {
      this.authorsListPm = authorsDto.result.map((author) => ({
        ...author,
        books: [],
      }));

      const allBooksDto = await this.getBooksOfAuthors(authorsDto);

      this.authorsListPm = this.authorsListPm.map((author) => ({
        ...author,
        books: this.getBooksOfAuthor(author, allBooksDto),
      }));
    }
  };

  getBooksOfAuthors = async (authorsDto: AuthorsListDto) => {
    const booksOfAuthorsPromises: Promise<BookDto>[] =
      authorsDto.result.flatMap((author) => {
        return author.bookIds.map(async (bookId) => {
          const bookDto: Promise<BookDto> = this.dataGateway.get(
            this.bookUrl +
              `?emailOwnerId=${this.userModel.email}&bookId=${bookId}`
          );

          return bookDto;
        });
      });

    return await Promise.all(booksOfAuthorsPromises);
  };

  getBooksOfAuthor = (author: AuthorDto, allBooks: BookDto[]) => {
    const booksOfAuthorsMapped = allBooks.flatMap((book) => book.result);

    return booksOfAuthorsMapped.filter((b) =>
      author.bookIds.includes(b.bookId)
    );
  };
}
