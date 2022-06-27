import { observer } from "mobx-react";
import * as React from "react";

export const LastAddedBookComponent = observer(
  ({ lastAddedBook }: { lastAddedBook: string }) => {
    return <p>Last Added Book : {lastAddedBook}</p>;
  }
);
