import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { APIPrefix as API } from '../tools/apiPrefixes'

const RegisterComponent = (props) => {
  const { handleLabelStyle } = props;

  const [loginInput, setloginInput] = useState("");
  const [emailInput, setemailInput] = useState("");
  const [passwordInput, setpasswordInput] = useState("");

  const loginLabelElement = useRef(null);
  const loginInputElement = useRef(null);
  const emailLabelElement = useRef(null);
  const emailInputElement = useRef(null);
  const passwordLabelElement = useRef(null);
  const passwordInputElement = useRef(null);

  const correctFormPopup = useRef(null)

  const handleInputs = (e) => {
    switch (e.target.name) {
      case "login":
        setloginInput(e.target.value);
        break;
      case "email":
        setemailInput(e.target.value);
        break;
      case "password":
        setpasswordInput(e.target.value);
        break;
      default:
        break;
    }
  };

  const registerFormSubmit = (e, login, email, pass) => {
    e.preventDefault();
    if (login.length < 5) {
      correctFormPopup.current.classList.add('register__correct_form_popup--active');
      correctFormPopup.current.textContent = 'Login has to have more than 5 characters!';
    } else if (!email.includes("@") || !email.includes(".")) {
      correctFormPopup.current.classList.add('register__correct_form_popup--active');
      correctFormPopup.current.textContent = 'Email is invalid!';
    } else if (pass.length < 8) {
      correctFormPopup.current.classList.add('register__correct_form_popup--active');
      correctFormPopup.current.textContent = 'Password has to have more than 8 characters!';
    } else {
      correctFormPopup.current.classList.remove('register__correct_form_popup--active');
      correctFormPopup.current.textContent = '';
      fetch(`${API}/auth/Register`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        mode: "cors",
        body: JSON.stringify({
          login: loginInput,
          email: emailInput,
          password: passwordInput,
        }),
      })
        .then((e) => e.json())
        .then((e) => {
          alert(e);
          setloginInput("");
          setemailInput("");
          setpasswordInput("");
          handleLabelStyle([[loginInputElement, loginLabelElement], [emailInputElement, emailLabelElement], [passwordInputElement, passwordLabelElement]]);
        })
        .catch((err) => {
          alert(err);
        });
    }


  };

  return (
    <>
      <div className="register">
        <div className="register__wrap">
          <nav className="register__main-page-nav">
            <NavLink to="/">
              <i className="fas fa-arrow-left"></i> Go back to{" "}
              <span>Main Page</span>
            </NavLink>
          </nav>
          <h1 className="register__title">
            Join and optimalize your work!
            <div className="register__correct_form_popup" ref={correctFormPopup}></div>
          </h1>
          <form action="register" className="register__form">
            <div className="register__form-login">
              <input
                name="login"
                type="text"
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
            <div className="register__form-email">
              <input
                name="email"
                type="email"
                ref={emailInputElement}
                value={emailInput}
                onChange={(e) => {
                  handleLabelStyle([[emailInputElement, emailLabelElement]]);
                  handleInputs(e);
                }}
              />
              <label htmlFor="email" ref={emailLabelElement}>
                Email
              </label>
            </div>
            <div className="register__form-password">
              <input
                name="password"
                type="password"
                ref={passwordInputElement}
                value={passwordInput}
                onChange={(e) => {
                  handleLabelStyle([
                    [passwordInputElement, passwordLabelElement]
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
              onClick={(e) => {
                registerFormSubmit(e, loginInput, emailInput, passwordInput)
              }}
            >
              Register!
            </button>
          </form>
          <nav className="register__login-nav">
            <span>or if You have an account, </span>
            <NavLink to="/Login">
              <span>Login</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
};

export default RegisterComponent;
