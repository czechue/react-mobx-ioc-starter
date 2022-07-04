import { inject, injectable } from "inversify";
import { action, computed, makeObservable, observable } from "mobx";

import { MessagesPresenter } from "../Core/Messages/MessagesPresenter";
import { AuthorsRepository } from "./AuthorsRepository";

type AuthorVm = {
  id: number;
  name: string;
  books: string[];
};

type AuthorListVm = {
  authorList: AuthorVm[];
  showAuthorList: boolean;
};

@injectable()
export class AuthorsPresenter extends MessagesPresenter {
  @inject(AuthorsRepository)
  authorsRepository!: AuthorsRepository;

  showAuthorList = false;

  newAuthorName = "";

  newBookName = "";

  get viewModel() {
    const vm: AuthorListVm = {
      authorList: [],
      showAuthorList: this.showAuthorList,
    };

    vm.authorList = this.authorsRepository.authorsListPm.map((author) => {
      return {
        id: author.authorId,
        name: author.name,
        books: author.books.map((book) => book.name),
      };
    });

    return vm;
  }

  constructor() {
    super();
    makeObservable(this, {
      viewModel: computed,
      showAuthorList: observable,
      newBookName: observable,
      newAuthorName: observable,
      toggleShowAuthorList: action,
      calculateShowAuthorList: action,
    });
    this.initMessages();
  }

  load = async () => {
    await this.authorsRepository.load();
    this.calculateShowAuthorList();
  };

  toggleShowAuthorList = () => {
    this.showAuthorList = !this.showAuthorList;
  };

  calculateShowAuthorList = () => {
    this.showAuthorList = this.authorsRepository.authorsListPm.length <= 4;
  };

  addBook = () => {
    this.authorsRepository.addBookInMemory(this.newBookName);
  };

  addAuthor = async () => {
    await this.authorsRepository.addAuthorWithBooks(this.newAuthorName);
  };
}
