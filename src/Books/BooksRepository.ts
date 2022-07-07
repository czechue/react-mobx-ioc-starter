import { inject, injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

import { UserModel } from "../Authentication/UserModel";
import type {
  AddNewBookRequestDto,
  AddNewBookResponseDto,
  BookListDto,
} from "../Core/Http/DTO/BooksDTO";
import { BookDto } from "../Core/Http/DTO/BooksDTO";
import { HttpGateway } from "../Core/Http/HttpGateway";
import { Types } from "../Core/Types";

type BookPm = {
  bookId?: number;
  name: string;
};

type BookListPm = BookPm[];

@injectable()
export class BooksRepository {
  bookUrl = "/book";

  booksUrl = "/books";

  @inject(Types.IHttpGateway)
  dataGateway!: HttpGateway;

  @inject(UserModel)
  userModel!: UserModel;

  bookListPm: BookListPm = [];

  constructor() {
    makeObservable(this, {
      bookListPm: observable,
      load: action,
      reset: action,
      addBook: action,
      updateBookListPm: action,
    });
  }

  updateBookListPm = (bookName: string) => {
    this.bookListPm.push({ name: bookName });
  };

  reset = () => {
    this.bookListPm = [];
  };

  load = async () => {
    const bookListDto = await this.getBooks();

    this.bookListPm = bookListDto.result;
  };

  getBook = async (bookId: number): Promise<BookDto> => {
    return this.dataGateway.get(
      this.bookUrl + `?emailOwnerId=${this.userModel.email}&bookId=${bookId}`
    );
  };

  getBooks = async () => {
    const bookListDto: BookListDto = await this.dataGateway.get(
      this.booksUrl + `?emailOwnerId=${this.userModel.email}`
    );

    return bookListDto;
  };

  addBook = async (newBookName: string): Promise<AddNewBookResponseDto> => {
    const newBookDto: AddNewBookRequestDto = {
      name: newBookName,
      emailOwnerId: this.userModel.email,
    };

    return await this.dataGateway.post<
      AddNewBookRequestDto,
      AddNewBookResponseDto
    >(this.booksUrl, newBookDto);
  };
}
