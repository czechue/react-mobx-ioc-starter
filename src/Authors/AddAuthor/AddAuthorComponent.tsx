import { observer } from "mobx-react";
import * as React from "react";
import { FormEventHandler } from "react";

import * as S from "../../Books/AddBooks/AddBooksStyled";
import { Sidebar } from "../../Components/layouts";

type AddAuthorProps = {
  presenter: {
    newAuthorName: string;
    addAuthor: () => void;
  };
  formValid: () => boolean;
};

export const AddAuthorComponent = observer(
  ({ presenter, formValid }: AddAuthorProps) => {
    const handleAddAuthor: FormEventHandler<HTMLFormElement> = async (
      event
    ) => {
      event.preventDefault();
      if (formValid()) {
        await presenter.addAuthor();
      }
    };

    return (
      <form onSubmit={handleAddAuthor}>
        <label htmlFor="add-new-book">
          <Sidebar side="right" space="0">
            <S.Input
              id="add-new-book"
              type="text"
              value={presenter.newAuthorName}
              placeholder="Enter book name"
              onChange={(event) => {
                presenter.newAuthorName = event.target.value;
              }}
            />
            <S.Button type="submit" value="Add Author">
              Add Author
            </S.Button>
          </Sidebar>
        </label>
      </form>
    );
  }
);
