import { observer } from "mobx-react";
import * as React from "react";
import { useTheme } from "styled-components";

import { Box, Center, Stack } from "../Components/layouts";
import { MessagesComponent } from "../Core/Messages/MessagesComponent";
import { useInject } from "../Core/Providers/Injection";
import { useValidation } from "../Core/Providers/Validation";
import { InjectableProps } from "../libs/react-di";
import { LogicRoomLogo } from "./components/LogicRoomLogo";
import { LoginRegisterPresenter } from "./LoginRegisterPresenter";
import * as S from "./LoginRegisterStyled";

const services: InjectableProps<{
  presenter: LoginRegisterPresenter;
}> = {
  presenter: LoginRegisterPresenter,
};

export const LoginRegisterComponent = observer(() => {
  const { updateClientValidationMessages } = useValidation();
  const { presenter } = useInject(services);
  const { space, color } = useTheme();
  const isLogin = presenter.option === "login";

  let formValid = () => {
    let clientValidationMessages = [];
    if (presenter.email === "") clientValidationMessages.push("No email");
    if (presenter.password === "") clientValidationMessages.push("No password");
    updateClientValidationMessages(clientValidationMessages);
    return clientValidationMessages.length === 0;
  };

  return (
    <Center gutters={space.s3}>
      <Stack>
        <LogicRoomLogo />
        <span>czechue@b.com | qwerty</span>

        <div>
          <S.Button
            style={{ background: color.primaryLight }}
            onClick={() => {
              presenter.option = "login";
            }}
          >
            Login
          </S.Button>
          <S.Button
            style={{ background: color.secondaryLight }}
            onClick={() => {
              presenter.option = "register";
            }}
          >
            Register
          </S.Button>
        </div>
        <Box
          padding={space.s1}
          style={{
            backgroundColor: isLogin ? color.primary : color.secondary,
          }}
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (formValid()) {
                if (isLogin) presenter.login();
                if (!isLogin) presenter.register();
              }
            }}
          >
            <Stack>
              <S.Input
                type="text"
                value={presenter.email}
                placeholder="Email"
                onChange={(event) => {
                  presenter.email = event.target.value;
                }}
              />
              <S.Input
                type="text"
                value={presenter.password}
                placeholder="Password"
                onChange={(event) => {
                  presenter.password = event.target.value;
                }}
              />
              <S.Button type="submit">
                {isLogin ? "Log in" : "Sign Up"}
              </S.Button>
              <MessagesComponent />
            </Stack>
          </form>
        </Box>
      </Stack>
    </Center>
  );
});
