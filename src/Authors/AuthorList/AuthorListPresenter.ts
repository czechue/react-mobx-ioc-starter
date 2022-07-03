import { inject, injectable } from "inversify";
import { computed, makeObservable, observable } from "mobx";

import { AuthorsRepository } from "../Repository/AuthorsRepository";

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
        books: author.books.map((book) => book.name),
      };
    });

    console.log("11111", vm.authorList);

    return vm;
  }

  constructor() {
    makeObservable(this, {
      viewModel: computed,
      authorsRepository: observable,
    });
  }
}
