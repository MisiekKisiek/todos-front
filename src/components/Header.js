import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { searchTask } from "../actions";
import { connect } from "react-redux";

const Header = (props) => {
  const [writeSearch, setwriteSearch] = useState("");

  const showMenu = (param) => {
    const menu = document.querySelector(".header__user-list");
    param === "remove"
      ? menu.classList.remove("active")
      : menu.classList.toggle("active");
  };

  return (
    <>
      <header className="header">
        <div className="header__wrap">
          <div className="header__logo">
            <div className="header__image">
              <NavLink to="/">
                <img
                  className="header__img"
                  src={require("../img/logo.png")}
                  alt=""
                />
              </NavLink>
            </div>
            <h2 className="header__title">toDos App</h2>
          </div>
          <ul className="header__user-list">
            {localStorage.getItem("logged") === "true" ? (
              <>
                <li className="header__user-item-login">
                  <NavLink
                    to="/User"
                    onClick={() => {
                      showMenu("remove");
                    }}
                  >
                    User
                  </NavLink>
                </li>
                <li className="header__user-item-login">
                  <NavLink
                    to="/"
                    onClick={() => {
                      props.logOut();
                      showMenu("remove");
                    }}
                  >
                    Log out
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="header__user-item-main-page">
                  <NavLink
                    to="/"
                    onClick={() => {
                      showMenu("remove");
                    }}
                  >
                    Main page
                  </NavLink>
                </li>
                <li className="header__user-item-login">
                  <NavLink
                    to="/LogIn"
                    onClick={() => {
                      showMenu("remove");
                    }}
                  >
                    Log in
                  </NavLink>
                </li>
                <li className="header__user-item-register">
                  <NavLink
                    to="/Register"
                    onClick={() => {
                      showMenu("remove");
                    }}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {localStorage.getItem("logged") === "true" ? (
            <div className="header__logged-search-task">
              <label htmlFor="search-task">
                <input
                  type="text"
                  name="search-task"
                  placeholder="Search task..."
                  value={writeSearch}
                  onChange={(e) => setwriteSearch(e.target.value)}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    props.searchTask(writeSearch);
                  }}
                >
                  <i className="fas fa-search"></i>
                </button>
                <span
                  onClick={() => {
                    setwriteSearch("");
                    props.searchTask("");
                  }}
                >
                  <i className="fas fa-times"></i>
                </span>
              </label>
            </div>
          ) : (
            <></>
          )}
          <div className="header__logged-user-icon" onClick={showMenu}>
            {localStorage.getItem("logged") === "true" ? (
              <i className="fas fa-user-circle"></i>
            ) : (
              <i className="fas fa-bars"></i>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

const MDTP = { searchTask };

export default connect(null, MDTP)(Header);
