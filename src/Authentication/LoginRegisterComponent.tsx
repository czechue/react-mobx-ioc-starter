import { observer } from "mobx-react";
import * as React from "react";

import { MessagesComponent } from "../Core/Messages/MessagesComponent";
import { useInject } from "../Core/Providers/Injection";
import { InjectableProps } from "../libs/react-di";
import { LoginRegisterPresenter } from "./LoginRegisterPresenter";

const services: InjectableProps<{
  presenter: LoginRegisterPresenter;
}> = {
  presenter: LoginRegisterPresenter,
};

export const LoginRegisterComponent = observer(() => {
  const { presenter } = useInject(services);

  const formValid = () => true;

  console.log("LoginRegisterComponent");

  return (
    <div className="login-register">
      <div className="w3-row">
        <div className="w3-col s4 w3-center">
          <br />
        </div>
        <div className="w3-col s4 w3-center logo">
          <img
            alt="logo"
            style={{ width: 160, filter: "grayscale(100%)" }}
            src="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/themes/2147767979/settings_images/iE7LayVvSHeoYcZWO4Dq_web-logo-pink-light-bg3x.png"
          />
        </div>
        <div className="w3-col s4 w3-center">
          <br />
        </div>
      </div>
      <div className="w3-row">
        <div className="w3-col s4 w3-center">
          <br />
        </div>
        <div className="w3-col s4 w3-center option">
          <input
            className="lr-submit"
            style={{ backgroundColor: "#e4257d" }}
            type="submit"
            value="login"
            onClick={() => {
              presenter.option = "login";
            }}
          />
          <input
            className="lr-submit"
            style={{ backgroundColor: "#2E91FC" }}
            type="submit"
            value="register"
            onClick={() => {
              presenter.option = "register";
            }}
          />
        </div>
        <div className="w3-col s4 w3-center">
          <br />
        </div>
      </div>
      <div
        className="w3-row"
        style={{
          backgroundColor: presenter.option === "login" ? "#E4257D" : "#2E91FC",
          height: 100,
          paddingTop: 20,
        }}
      >
        <form
          className="login"
          onSubmit={(event) => {
            event.preventDefault();
            if (formValid()) {
              if (presenter.option === "login") presenter.login();
              if (presenter.option === "register") presenter.register();
            }
          }}
        >
          <div className="w3-col s4 w3-center">
            <input
              type="text"
              value={presenter.email}
              placeholder="Email"
              onChange={(event) => {
                presenter.email = event.target.value;
              }}
            />
          </div>
          <div className="w3-col s4 w3-center">
            {" "}
            <input
              type="text"
              value={presenter.password}
              placeholder="Password"
              onChange={(event) => {
                presenter.password = event.target.value;
              }}
            />
          </div>
          <div className="w3-col s4 w3-center">
            <input
              type="submit"
              className="lr-submit"
              value={presenter.option}
            />
          </div>

          <br />
          <br />
          <br />
        </form>
      </div>
      <MessagesComponent />
    </div>
  );
});
