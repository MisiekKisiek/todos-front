import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";

const LoginComponent = (props) => {
  const { handleLabelStyle } = props;

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

  const registerFormSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:9000/auth/Login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      mode: "cors",
      body: JSON.stringify({
        login: loginInput,
        password: passwordInput,
      }),
    })
      .then((e) => {
        if (e.status === 200) return e.json()
        if (e.status === 401) throw Error('Username or login are invalid')
        else throw Error('We have some problems, sorry')
      })
      .then(async (e) => {
        await localStorage.setItem("token", e.token);
        await localStorage.setItem("logged", true);
        alert('You have been logged in!');
        props.forceUpdateApp();
      }).catch((err) => { alert(err.message) })
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
                registerFormSubmit(e);
                await setloginInput("");
                await setpasswordInput("");
                handleLabelStyle([
                  [loginInputElement, loginLabelElement],
                  [passwordInputElement, passwordLabelElement],
                ]);
              }}
            >
              Log in!
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
