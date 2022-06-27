import { observer } from "mobx-react";
import * as React from "react";
import { useEffect } from "react";

import { useInject } from "../../Core/Providers/Injection";
import { InjectableProps } from "../../libs/react-di";
import { BookListPresenter } from "./BookListPresenter";

const services: InjectableProps<{
  presenter: BookListPresenter;
}> = {
  presenter: BookListPresenter,
};

export const BookListComponent = observer(() => {
  const { presenter } = useInject(services);

  return (
    <>
      <h4>Book List</h4>
      <ul>
        {presenter.viewModel.bookList.reverse().map((book) => {
          return (
            <li style={{ listStyleType: "none" }} key={book.id}>
              {book.name}
            </li>
          );
        })}
      </ul>
      {presenter.viewModel.showMore && <a href="/">...show more</a>}
    </>
  );
});
