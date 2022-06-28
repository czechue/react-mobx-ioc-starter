import { inject, injectable } from "inversify";
import { computed, makeObservable, observable } from "mobx";

import { MessagesPresenter } from "../Core/Messages/MessagesPresenter";
import { AuthorsRepository } from "./AuthorsRepository";

type AuthorVm = {
  authorId: number;
  name: string;
  books: string[];
};

type AuthorListVm = {
  authorList: AuthorVm[];
};

@injectable()
export class AuthorsPresenter extends MessagesPresenter {
  @inject(AuthorsRepository)
  authorsRepository!: AuthorsRepository;

  get viewModel() {
    const vm: AuthorListVm = {
      authorList: [],
    };

    vm.authorList = this.authorsRepository.authorsListPm.map((author) => {
      return {
        ...author,
        books: author.bookIds.map((bookId) => {
          return (
            this.authorsRepository?.bookListPm?.find(
              (book) => book.bookId === bookId
            )?.name || ""
          );
        }),
      };
    });

    return vm;
  }

  constructor() {
    super();
    makeObservable(this, {
      viewModel: computed,
    });
    this.initMessages();
  }

  load = async () => {
    await this.authorsRepository.load();
  };
}
