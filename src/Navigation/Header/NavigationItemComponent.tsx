/* eslint-disable no-unused-vars */
import React from "react";

type NavigationItemComponentProps = {
  id: string;
  text: string;
  isActive: boolean;
  goToId: (id: string) => void;
};

export const NavigationItemComponent = (
  props: NavigationItemComponentProps
) => {
  const handleOnClick = () => {
    props.goToId(props.id);
  };

  return (
    <li>
      <button onClick={handleOnClick}>{props.text}</button>
    </li>
  );
};
