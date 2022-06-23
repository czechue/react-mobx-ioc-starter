import { observer } from "mobx-react";
import * as React from "react";

import { useInject } from "../Core/Providers/Injection";
import { InjectableProps } from "../libs/react-di";
import { BooksPresenter } from "./BooksPresenter";

const services: InjectableProps<{
  presenter: BooksPresenter;
}> = {
  presenter: BooksPresenter,
};

export const BooksComponent = observer(() => {
  const { presenter } = useInject(services);

  return (
    <>
      <h1>Books</h1>
      {presenter.viewModel}
    </>
  );
});
