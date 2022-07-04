import { observer } from "mobx-react";
import * as React from "react";
import { FormEventHandler } from "react";

import { Sidebar } from "../../Components/layouts";
import { useValidation } from "../../Core/Providers/Validation";
import * as S from "./AddBooksStyled";

type AddBooksProps = {
  presenter: {
    newBookName: string;
    addBook: () => void;
  };
};

export const AddBooksComponent = observer(({ presenter }: AddBooksProps) => {
  const { updateClientValidationMessages } = useValidation();

  let formValid = () => {
    let clientValidationMessages = [];
    if (presenter.newBookName === "")
      clientValidationMessages.push("No book name");
    updateClientValidationMessages(clientValidationMessages);
    return clientValidationMessages.length === 0;
  };

  const handleAddBook: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (formValid()) {
      await presenter.addBook();
    }
  };

  return (
    <form onSubmit={handleAddBook}>
      <label htmlFor="add-new-book">
        <Sidebar side="right" space="0">
          <S.Input
            id="add-new-book"
            type="text"
            value={presenter.newBookName}
            placeholder="Enter book name"
            onChange={(event) => {
              presenter.newBookName = event.target.value;
            }}
          />
          <S.Button type="submit" value="Add Book">
            Add book
          </S.Button>
        </Sidebar>
      </label>
    </form>
  );
});
