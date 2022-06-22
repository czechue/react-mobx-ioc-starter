import { observer } from "mobx-react";
import * as React from "react";
import { useTheme } from "styled-components";

import { Box, Center, Stack } from "../Components/layouts";
import { MessagesComponent } from "../Core/Messages/MessagesComponent";
import { useInject } from "../Core/Providers/Injection";
import { InjectableProps } from "../libs/react-di";
import { LogicRoomLogo } from "./components/LogicRoomLogo";
import * as S from "./LoginRegister.styled";
import { LoginRegisterPresenter } from "./LoginRegisterPresenter";

const services: InjectableProps<{
  presenter: LoginRegisterPresenter;
}> = {
  presenter: LoginRegisterPresenter,
};

export const LoginRegisterComponent = observer(() => {
  const { presenter } = useInject(services);
  const { space, color } = useTheme();
  const isLogin = presenter.option === "login";

  const formValid = () => true;

  return (
    <Center gutters={space.s3}>
      <Stack>
        <LogicRoomLogo />
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
          <Stack>
            <S.Input
              type="text"
              style={{ background: "white" }}
              value={presenter.email}
              placeholder="Email"
              onChange={(event) => {
                presenter.email = event.target.value;
              }}
            />
            <S.Input
              type="text"
              style={{ background: "white" }}
              value={presenter.password}
              placeholder="Password"
              onChange={(event) => {
                presenter.password = event.target.value;
              }}
            />
            <form
              className="login"
              onSubmit={(event) => {
                event.preventDefault();
                if (formValid()) {
                  if (isLogin) presenter.login();
                  if (!isLogin) presenter.register();
                }
              }}
            >
              <S.Button type="submit">
                {isLogin ? "Log in" : "Sign Up"}
              </S.Button>
            </form>
            <MessagesComponent />
          </Stack>
        </Box>
      </Stack>
    </Center>
  );
});
