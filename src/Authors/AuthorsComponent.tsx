import { observer } from "mobx-react";
import * as React from "react";
import { useEffect } from "react";

import { AddBooksComponent } from "../Books/AddBooks/AddBooksComponent";
import { BookListComponent } from "../Books/BookList/BookListComponent";
import { Stack } from "../Components/layouts";
import { MessagesComponent } from "../Core/Messages/MessagesComponent";
import { useInject } from "../Core/Providers/Injection";
import { useValidation } from "../Core/Providers/Validation";
import { InjectableProps } from "../libs/react-di";
import { AddAuthorComponent } from "./AddAuthor/AddAuthorComponent";
import { AuthorListComponent } from "./AuthorList/AuthorListComponent";
import { AuthorsPresenter } from "./AuthorsPresenter";
import * as S from "./AuthorsStyled";

const services: InjectableProps<{
  presenter: AuthorsPresenter;
}> = {
  presenter: AuthorsPresenter,
};

export const AuthorsComponent = observer(() => {
  const { presenter } = useInject(services);
  const { updateClientValidationMessages } = useValidation();

  useEffect(() => {
    presenter.load();
  }, []);

  console.log("Main", presenter.viewModel);

  const formValid = () => {
    let clientValidationMessages = [];
    if (presenter.newAuthorName === "")
      clientValidationMessages.push("No author name");
    updateClientValidationMessages(clientValidationMessages);
    return clientValidationMessages.length === 0;
  };

  return (
    <Stack>
      <h1>Authors</h1>
      <S.Button type="button" onClick={() => presenter.toggleShowAuthorList()}>
        Show Author List
      </S.Button>
      <AuthorListComponent />

      <AddAuthorComponent presenter={presenter} formValid={formValid} />
      <AddBooksComponent presenter={presenter} />
      <BookListComponent />
      <MessagesComponent />
    </Stack>
  );
});
