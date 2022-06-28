import { inject, injectable } from "inversify";
import { computed, makeObservable } from "mobx";

import { BooksRepository } from "../BooksRepository";

type BookListVm = {
  bookList: {
    id: number;
    name: string;
  }[];
  showMore: boolean;
};

const INIT_ITEMS_NUMBER = 10;

@injectable()
export class BookListPresenter {
  @inject(BooksRepository)
  booksRepository!: BooksRepository;

  get viewModel() {
    const vm: BookListVm = {
      bookList: [],
      showMore: false,
    };

    vm.bookList = this.booksRepository.bookListPm
      .map((bookPm) => ({
        id: bookPm.bookId,
        name: bookPm.name,
      }))
      .reverse()
      .slice(0, INIT_ITEMS_NUMBER);

    vm.showMore = this.booksRepository.bookListPm.length > INIT_ITEMS_NUMBER;

    return vm;
  }

  constructor() {
    makeObservable(this, {
      viewModel: computed,
    });
  }
}
