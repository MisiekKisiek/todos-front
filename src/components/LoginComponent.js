import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { APIPrefix as API } from "../tools/apiPrefixes";

const LoginComponent = (props) => {
  const { handleLabelStyle, handleMessagePopup } = props;

  const [loginInput, setloginInput] = useState("");
  const [passwordInput, setpasswordInput] = useState("");

  const loginLabelElement = useRef(null);
  const loginInputElement = useRef(null);
  const passwordLabelElement = useRef(null);
  const passwordInputElement = useRef(null);

  const handleInputs = (e) => {
    switch (e.target.name) {
      case "login":
        setloginInput(e.target.value);
        break;
      case "password":
        setpasswordInput(e.target.value);
        break;
      default:
        break;
    }
  };

  const loginFormSubmit = (e) => {
    e.preventDefault();
    fetch(`${API}/auth/Login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      mode: "cors",
      body: JSON.stringify({
        login: loginInput,
        password: passwordInput,
      }),
    })
      .then((e) => {
        if (e.status === 200) return e.json();
        if (e.status === 401) throw Error("Username or login are invalid");
        else throw Error("We have some problems, sorry");
      })
      .then(async (e) => {
        await localStorage.setItem("token", e.token);
        await localStorage.setItem("logged", true);
        await localStorage.setItem("user", e.user);
        await localStorage.setItem("email", e.email);
        handleMessagePopup("You have been logged.");
        props.forceUpdateApp();
      })
      .catch((err) => {
        handleMessagePopup(err.message);
      });
  };

  return (
    <>
      <div className="login">
        <div className="login__wrap">
          <nav className="login__main-page-nav">
            <NavLink to="/">
              <i className="fas fa-arrow-left"></i> Go back to{" "}
              <span>Main Page</span>
            </NavLink>
          </nav>
          <h1 className="login__title">Login and organize!</h1>
          <form action="login" className="login__form">
            <div className="login__form-login">
              <input
                type="text"
                name="login"
                autoComplete="off"
                ref={loginInputElement}
                value={loginInput}
                onChange={(e) => {
                  handleLabelStyle([[loginInputElement, loginLabelElement]]);
                  handleInputs(e);
                }}
              />
              <label htmlFor="login" ref={loginLabelElement}>
                Login
              </label>
            </div>
            <div className="login__form-password">
              <input
                type="password"
                name="password"
                autoComplete="off"
                ref={passwordInputElement}
                value={passwordInput}
                onChange={(e) => {
                  handleLabelStyle([
                    [passwordInputElement, passwordLabelElement],
                  ]);
                  handleInputs(e);
                }}
              />
              <label htmlFor="password" ref={passwordLabelElement}>
                Password
              </label>
            </div>
            <button
              type="submit"
              onClick={async (e) => {
                await loginFormSubmit(e);
                setloginInput("");
                setpasswordInput("");
                handleLabelStyle([
                  [loginInputElement, loginLabelElement],
                  [passwordInputElement, passwordLabelElement],
                ]);
              }}
            >
              Log in!
            </button>
          </form>
          <nav className="login__register-nav">
            <span>or if You don't have an account, </span>
            <NavLink to="/Register">
              <span>Register</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
