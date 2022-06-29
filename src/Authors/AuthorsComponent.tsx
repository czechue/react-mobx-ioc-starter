import { observer } from "mobx-react";
import * as React from "react";
import { useEffect } from "react";

import { BookListComponent } from "../Books/BookList/BookListComponent";
import { Stack } from "../Components/layouts";
import { useInject } from "../Core/Providers/Injection";
import { InjectableProps } from "../libs/react-di";
import { AuthorListComponent } from "./AuthorList/AuthorListComponent";
import { AuthorsPresenter } from "./AuthorsPresenter";

const services: InjectableProps<{
  presenter: AuthorsPresenter;
}> = {
  presenter: AuthorsPresenter,
};

export const AuthorsComponent = observer(() => {
  const { presenter } = useInject(services);

  useEffect(() => {
    presenter.load();
  }, []);

  return (
    <Stack>
      <h1>Authors</h1>
      <AuthorListComponent />

      <BookListComponent />
    </Stack>
  );
});
