import { inject, injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

import { UserModel } from "../Authentication/UserModel";
import { BooksRepository } from "../Books/BooksRepository";
import {
  AuthorDto,
  AuthorsListDto,
  CreateAuthorRequestDto,
  CreateAuthorResponseDto,
} from "../Core/Http/DTO/AuthorsDTO";
import { BookDto } from "../Core/Http/DTO/BooksDTO";
import { HttpGateway } from "../Core/Http/HttpGateway";
import { MessagePacking } from "../Core/Messages/MessagePacking";
import { Types } from "../Core/Types";

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

  @inject(BooksRepository)
  booksRepository!: BooksRepository;

  authorsListPm: AuthorsListPm = [];

  constructor() {
    makeObservable(this, {
      load: action,
      getAuthors: action,
      authorsListPm: observable,
      addAuthorWithBooks: observable,
    });
  }

  load = async () => {
    this.booksRepository.reset();

    const authorsDto = await this.getAuthors();

    if (authorsDto.success) {
      this.authorsListPm = authorsDto.result.map((author) => ({
        ...author,
        books: [],
      }));

      const allBooksDto = await this.getBooksOfAuthors(authorsDto);

      this.authorsListPm = this.authorsListPm.map((author) => ({
        ...author,
        books: this.filterBooksOfAuthor(author, allBooksDto),
      }));
    }
  };

  getAuthors = async () => {
    const authorsDto: AuthorsListDto = await this.dataGateway.get(
      this.authorsUrl + `?emailOwnerId=${this.userModel.email}`
    );

    return authorsDto;
  };

  addAuthor = async (newAuthorName: string, authorBookIds: number[]) => {
    return await this.dataGateway.post<
      CreateAuthorRequestDto,
      CreateAuthorResponseDto
    >(this.authorsUrl, {
      name: newAuthorName,
      bookIds: authorBookIds,
      emailOwnerId: this.userModel.email,
    });
  };

  addAuthorWithBooks = async (newAuthorName: string) => {
    // todo: shouldn't be these 2 methods in booksRepository?
    const bookNamesToAdd = this.booksRepository.bookListPm.map(
      (book) => book.name
    );
    const booksToAddPromises = bookNamesToAdd.map((bookName) => {
      return this.booksRepository.addBook(bookName);
    });
    const booksToAddDto = await Promise.all(booksToAddPromises);

    // todo: to get bookIds method
    const justAddedBookIds = booksToAddDto.map((book) => book.result.bookId);

    const addAuthorDto = await this.addAuthor(newAuthorName, justAddedBookIds);

    return MessagePacking.unpackServerDtoToPm(addAuthorDto);
  };

  getBooksOfAuthors = async (authorsDto: AuthorsListDto) => {
    const booksOfAuthorsPromises = authorsDto.result.flatMap((author) => {
      return author.bookIds.map(async (bookId) => {
        return this.booksRepository.getBook(bookId);
      });
    });

    return await Promise.all(booksOfAuthorsPromises);
  };

  filterBooksOfAuthor = (author: AuthorDto, allBooks: BookDto[]) => {
    const booksOfAuthorsMapped = allBooks.flatMap((book) => book.result);

    return booksOfAuthorsMapped.filter((b) =>
      author.bookIds.includes(b.bookId)
    );
  };

  addBookInMemory = (newBookName: string) => {
    this.booksRepository.updateBookListPm(newBookName);
  };
}
