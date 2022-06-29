import { inject, injectable } from "inversify";
import { computed, makeObservable } from "mobx";

import { AuthorsRepository } from "../AuthorsRepository";

type AuthorVm = {
  id: number;
  name: string;
  books: string[];
};

type AuthorListVm = {
  authorList: AuthorVm[];
};

@injectable()
export class AuthorListPresenter {
  @inject(AuthorsRepository)
  authorsRepository!: AuthorsRepository;

  get viewModel() {
    const vm: AuthorListVm = {
      authorList: [],
    };

    vm.authorList = this.authorsRepository.authorsListPm.map((author) => {
      return {
        id: author.authorId,
        name: author.name,
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
    makeObservable(this, {
      viewModel: computed,
    });
  }
}
