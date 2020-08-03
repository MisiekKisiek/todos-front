import React, { useState, useRef } from "react";

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
      .then((e) => e.json())
      .then((e) => {
        alert(e);
        setloginInput("");
        setpasswordInput("");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <div className="login">
        <div className="login__wrap">
          <h1 className="login__title">Login and organize!</h1>
          <form action="login" className="login__form">
            <div className="login__form-login">
              <input type="text" name="login" ref={loginInputElement} value={loginInput} onChange={(e) => {
                handleLabelStyle([[loginInputElement, loginLabelElement]]);
                handleInputs(e)
              }} />
              <label htmlFor="login" ref={loginLabelElement}>Login</label>
            </div>
            <div className="login__form-password">
              <input type="password" name="password" ref={passwordInputElement} value={passwordInput} onChange={(e) => {
                handleLabelStyle([[passwordInputElement, passwordLabelElement]]);
                handleInputs(e)
              }} />
              <label htmlFor="password" ref={passwordLabelElement}>Password</label>
            </div>
            <button type="submit" onClick={(e) => {
              registerFormSubmit(e)
            }}>Log in!</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
