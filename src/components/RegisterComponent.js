import React, { useState } from "react";

const RegisterComponent = () => {
  const [loginInput, setloginInput] = useState("");
  const [emailInput, setemailInput] = useState("");
  const [passwordInput, setpasswordInput] = useState("");

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

  const registerFormSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:9000/auth/Register", {
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
      })
      .catch((err) => {
        alert(err);
      });
  };
  const test = (e) => {
    e.preventDefault();
    fetch("http://localhost:9000/test", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        login: loginInput,
        email: emailInput,
        password: passwordInput,
      }),
    })
      .then((e) => e.json())
      .then((e) => console.log(e));
  };

  return (
    <>
      <div className="register">
        <div className="register__wrap">
          <form action="register" className="register__form">
            <div className="register__form-login">
              <label htmlFor="login">Login</label>
              <input
                name="login"
                type="text"
                value={loginInput}
                onChange={(e) => {
                  handleInputs(e);
                }}
              />
            </div>
            <div className="register__form-email">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                value={emailInput}
                onChange={(e) => {
                  handleInputs(e);
                }}
              />
            </div>
            <div className="register__form-password">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  handleInputs(e);
                }}
              />
            </div>
            <button
              type="submit"
              onClick={(e) => {
                registerFormSubmit(e);
                // test(e);
              }}
            >
              Register!
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterComponent;
