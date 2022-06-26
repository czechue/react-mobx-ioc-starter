import { HttpGateway } from "../Core/Http/HttpGateway";
import { Types } from "../Core/Types";
import { AppTestHarness } from "../TestTools/AppHarness";
import { GetSuccessfulBookAddedStub } from "../TestTools/GetSuccessfulBookAddedStub";
import { GetSuccessfulUserLoginStub } from "../TestTools/GetSuccessfulUserLoginStub";
import { SingleBooksResultStub } from "../TestTools/SingleBooksResultStub";
import { BookListPresenter } from "./BookList/BookListPresenter";
import { BooksPresenter } from "./BooksPresenter";
import { BooksRepository } from "./BooksRepository";

let appTestHarness: AppTestHarness;
let dataGateway: HttpGateway;
let booksPresenter: BooksPresenter;
let bookListPresenter: BookListPresenter;
let booksRepository: BooksRepository;
let onRouteChange = () => {};

describe("books", () => {
  beforeEach(async () => {
    appTestHarness = new AppTestHarness();
    appTestHarness.init();
    appTestHarness.bootStrap(onRouteChange);
    await appTestHarness.setupLogin(GetSuccessfulUserLoginStub);

    dataGateway = appTestHarness.container.get(Types.IHttpGateway);
    booksPresenter = appTestHarness.container.get(BooksPresenter);
    bookListPresenter = appTestHarness.container.get(BookListPresenter);
    booksRepository = appTestHarness.container.get(BooksRepository);
  });

  describe("loading", () => {
    it("should show book list", async () => {
      dataGateway.get = jest.fn().mockImplementation(() => {
        return Promise.resolve(SingleBooksResultStub());
      });

      await booksPresenter.load();

      expect(bookListPresenter.viewModel.bookList.length).toBe(4);
      expect(bookListPresenter.viewModel.bookList[0].id).toBe(911);
    });
  });

  describe("saving", () => {
    beforeEach(async () => {
      dataGateway.get = jest.fn().mockImplementation(() => {
        return Promise.resolve(SingleBooksResultStub());
      });
      dataGateway.post = jest.fn().mockImplementation(() => {
        return Promise.resolve(GetSuccessfulBookAddedStub("69"));
      });
      booksRepository.userModel = { token: "123", email: "123@ab.com" };
      booksPresenter.newBookName = "Foo Name";

      await booksPresenter.load();
    });

    it("should reload books list", async () => {
      expect(bookListPresenter.viewModel.bookList.length).toBe(4);

      // pivot
      dataGateway.get = jest.fn().mockImplementation(() => {
        const stub = SingleBooksResultStub();
        stub.result.push({
          name: "foo",
          emailOwnerId: "bar",
          bookId: 1,
          devOwnerId: "2",
        });
        return Promise.resolve(stub);
      });

      await booksPresenter.addBook();

      expect(bookListPresenter.viewModel.bookList.length).toBe(5);
    });

    it("should update books message", async () => {
      await booksPresenter.addBook();

      expect(dataGateway.post).toHaveBeenCalledWith("/books", {
        emailOwnerId: "123@ab.com",
        name: "Foo Name",
      });
      expect(booksPresenter.messages).toEqual(["Book [id: 69] created"]);
    });
  });
});
