import { observer } from "mobx-react";
import * as React from "react";

import { useInject } from "../../Core/Providers/Injection";
import { InjectableProps } from "../../libs/react-di";
import { AuthorsPresenter } from "../AuthorsPresenter";

const services: InjectableProps<{
  presenter: AuthorsPresenter;
}> = {
  presenter: AuthorsPresenter,
};

export const AuthorListComponent = observer(() => {
  const { presenter } = useInject(services);

  if (!presenter.viewModel.showAuthorList) return null;
  if (presenter.viewModel.authorList.length === 0) return null;

  return (
    <ul>
      {presenter.viewModel.authorList.map((author) => {
        return (
          <li key={author.id} style={{ listStyleType: "none" }}>
            {author.name} | {author.books.join(", ")}
          </li>
        );
      })}
    </ul>
  );
});
