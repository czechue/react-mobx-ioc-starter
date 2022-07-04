import { inject, injectable } from "inversify";
import { makeObservable, observable } from "mobx";

import { MessagesPresenter } from "../Core/Messages/MessagesPresenter";
import { BooksRepository } from "./BooksRepository";

@injectable()
export class BooksPresenter extends MessagesPresenter {
  @inject(BooksRepository)
  booksRepository!: BooksRepository;

  newBookName = "";

  lastAddedBook = "";

  constructor() {
    super();
    makeObservable(this, {
      newBookName: observable,
      lastAddedBook: observable,
    });
    this.initMessages();
  }

  load = async () => {
    await this.booksRepository.load();
  };

  reset = () => {
    this.newBookName = "";
  };

  addBook = async () => {
    const addBookPm = await this.booksRepository.addBook(this.newBookName);

    if (addBookPm.success) {
      await this.booksRepository.load();
      this.lastAddedBook = this.newBookName;
      this.reset();
    }

    this.messageUnpackRepositoryPmToVm(
      { success: addBookPm.success, serverMessage: addBookPm.result.message },
      `Book [id: ${addBookPm.result.bookId}] created`
    );
  };
}
