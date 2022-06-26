import { inject, injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";

import { UserModel } from "../Authentication/UserModel";
import { HttpGateway } from "../Core/Http/HttpGateway";
import { Types } from "../Core/Types";

type AddNewBookRequestDto = {
  name: string;
  emailOwnerId: string;
};

type AddNewBookResponseDto = {
  success: boolean;
  result: {
    message: string;
    bookId: number;
  };
};

type BookDto = {
  bookId: number;
  name: string;
  emailOwnerId: string;
  devOwnerId: string;
};

type BookListDto = {
  success: boolean;
  result: BookDto[];
};

type BookPm = {
  bookId: number;
  name: string;
  emailOwnerId: string;
  devOwnerId: string;
};

type BookListPm = BookPm[];

@injectable()
export class BooksRepository {
  baseUrl = "/books";

  @inject(Types.IHttpGateway)
  dataGateway!: HttpGateway;

  @inject(UserModel)
  userModel!: UserModel;

  bookListPm: BookListPm = [];

  constructor() {
    makeObservable(this, {
      bookListPm: observable,
      load: action,
    });
  }

  reset = () => {
    console.log("reset");
  };

  load = async () => {
    const bookListDto: BookListDto = await this.dataGateway.get(
      this.baseUrl + `?emailOwnerId=${this.userModel.email}`
    );

    this.bookListPm = bookListDto.result;
  };

  addBook = async (newBookName: string) => {
    const newBookDto: AddNewBookRequestDto = {
      name: newBookName,
      emailOwnerId: this.userModel.email,
    };

    const addBookDto = await this.dataGateway.post<
      AddNewBookRequestDto,
      AddNewBookResponseDto
    >(this.baseUrl, newBookDto);

    if (addBookDto.success) {
      await this.load();
    }

    return addBookDto;
  };
}
