import { BookListPresenter } from "../Books/BookList/BookListPresenter";
import { BooksRepository } from "../Books/BooksRepository";
import { HttpGateway } from "../Core/Http/HttpGateway";
import { Types } from "../Core/Types";
import { AppTestHarness } from "../TestTools/AppHarness";
import { GetSuccessfulAuthorAddedStub } from "../TestTools/GetSuccessfulAuthorAddedStub";
import { GetSuccessfulBookAddedStub } from "../TestTools/GetSuccessfulBookAddedStub";
import { GetSuccessfulUserLoginStub } from "../TestTools/GetSuccessfulUserLoginStub";
import { SingleAuthorsResultStub } from "../TestTools/SingleAuthorsResultStub";
import { SingleBookResultStub } from "../TestTools/SingleBookResultStub";
import { AuthorsPresenter } from "./AuthorsPresenter";

let appTestHarness: AppTestHarness;
let dataGateway: HttpGateway;
let authorsPresenter: AuthorsPresenter;
let bookListPresenter: BookListPresenter;
let booksRepository: BooksRepository;
let dynamicBookNamesStack: string[] = [];
let dynamicBookIdStack: string[] = [];

describe("authors", () => {
  beforeEach(async () => {
    appTestHarness = new AppTestHarness();
    appTestHarness.init();
    appTestHarness.bootStrap(() => {});
    await appTestHarness.setupLogin(GetSuccessfulUserLoginStub);
    authorsPresenter = appTestHarness.container.get(AuthorsPresenter);
    bookListPresenter = appTestHarness.container.get(BookListPresenter);
    booksRepository = appTestHarness.container.get(BooksRepository);
    dataGateway = appTestHarness.container.get(Types.IHttpGateway);
    dynamicBookNamesStack = ["bookA", "bookB", "bookC"];
    dynamicBookIdStack = ["5", "4", "3", "2", "1"];

    dataGateway.post = jest.fn().mockImplementation((path: string) => {
      if (path.indexOf("/books") !== -1) {
        return Promise.resolve(
          GetSuccessfulBookAddedStub(dynamicBookIdStack.pop())
        );
      } else if (path.indexOf("/authors") !== -1) {
        return Promise.resolve(GetSuccessfulAuthorAddedStub());
      }
    });

    dataGateway.get = jest.fn().mockImplementation((path: string) => {
      if (path.indexOf("/authors") !== -1) {
        return Promise.resolve(SingleAuthorsResultStub());
      } else if (path.indexOf("/book?emailOwnerId=a@b.com&bookId=") !== -1) {
        return Promise.resolve(
          SingleBookResultStub(dynamicBookNamesStack.pop())
        );
      }
    });
  });

  describe("loading", async () => {
    it("should load list author and books into ViewModel", async () => {
      // ...
    });

    it("should show author list (toggle) when has authors", async () => {
      // ...
    });

    it("should hide author list (toggle) when has more than 4 authors", async () => {
      // ...
    });
  });

  describe("saving", () => {
    it("should allow single author to be added and will reload authors list", async () => {
      // ...
    });

    it("should allow books to be staged and then save authors and books to api", async () => {
      // ...
    });
  });
});
