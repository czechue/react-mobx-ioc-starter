import { observer } from "mobx-react";
import * as React from "react";
import { useEffect } from "react";

import { Stack } from "../Components/layouts";
import { MessagesComponent } from "../Core/Messages/MessagesComponent";
import { useInject } from "../Core/Providers/Injection";
import { InjectableProps } from "../libs/react-di";
import { AddBooksComponent } from "./AddBooks/AddBooksComponent";
import { BookListComponent } from "./BookList/BookListComponent";
import { BooksPresenter } from "./BooksPresenter";

const services: InjectableProps<{
  presenter: BooksPresenter;
}> = {
  presenter: BooksPresenter,
};

export const BooksComponent = observer(() => {
  const { presenter } = useInject(services);

  useEffect(() => {
    presenter.load();
  }, []);

  return (
    <Stack>
      <h1>Books</h1>
      <AddBooksComponent presenter={presenter} />
      <BookListComponent />
      <MessagesComponent />
    </Stack>
  );
});
