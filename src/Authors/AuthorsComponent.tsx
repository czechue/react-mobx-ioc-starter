import { observer } from "mobx-react";
import * as React from "react";
import { useEffect } from "react";

import { Stack } from "../Components/layouts";
import { useInject } from "../Core/Providers/Injection";
import { InjectableProps } from "../libs/react-di";
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
      <ul>
        {presenter.viewModel.authorList.map((author) => {
          return (
            <li key={author.authorId} style={{ listStyleType: "none" }}>
              {author.name} | {author.books.join(", ")}
            </li>
          );
        })}
      </ul>
    </Stack>
  );
});
