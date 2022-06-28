import { inject, injectable } from "inversify";
import { action, makeObservable } from "mobx";

import { UserModel } from "../Authentication/UserModel";
import { AuthorDto, AuthorsListDto } from "../Core/Http/DTO/AuthorsDTO";
import { BookListDto } from "../Core/Http/DTO/BooksDTO";
import { HttpGateway } from "../Core/Http/HttpGateway";
import { Types } from "../Core/Types";

type AuthorsListPm = AuthorDto[];

type BookPm = {
  bookId: number;
  name: string;
};

type BookListPm = BookPm[];

@injectable()
export class AuthorsRepository {
  authorsUrl = "/authors";

  booksUrl = "/books";

  @inject(Types.IHttpGateway)
  dataGateway!: HttpGateway;

  @inject(UserModel)
  userModel!: UserModel;

  authorsListPm: AuthorsListPm = [];

  bookListPm: BookListPm = [];

  constructor() {
    makeObservable(this, {
      load: action,
    });
  }

  load = async () => {
    const authorsDto: AuthorsListDto = await this.dataGateway.get(
      this.authorsUrl + `?emailOwnerId=${this.userModel.email}`
    );
    const bookListDto: BookListDto = await this.dataGateway.get(
      this.booksUrl + `?emailOwnerId=${this.userModel.email}`
    );

    this.authorsListPm = authorsDto.result;
    this.bookListPm = bookListDto.result;
  };
}
