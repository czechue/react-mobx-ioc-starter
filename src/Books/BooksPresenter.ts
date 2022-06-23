import { inject, injectable } from "inversify";
import { computed, makeObservable } from "mobx";

import { BooksRepository } from "./BooksRepository";

@injectable()
export class BooksPresenter {
  @inject(BooksRepository)
  booksRepository!: BooksRepository;

  newBookName = "";

  get viewModel() {
    return this.booksRepository.messagePm;
  }

  constructor() {
    makeObservable(this, {
      viewModel: computed,
    });
  }

  reset = () => {
    this.newBookName = "";
  };
}
