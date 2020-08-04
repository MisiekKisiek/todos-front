import React from "react";
import { NavLink } from "react-router-dom";

import { searchTask } from "../actions";
import { connect } from "react-redux";

const Header = (props) => {

  const showMenu = (param) => {
    const menu = document.querySelector('.header__user-list');
    param === "remove" ? menu.classList.remove('active') : menu.classList.toggle('active')
  }

  return (
    <>
      <header className="header">
        <div className="header__wrap">
          <div className="header__logo">
            <div className="header__image">
              <NavLink to="/">
                <img src={require("../img/logo.png")} alt="" />
              </NavLink>
            </div>
            <h2 className="header__title">toDos App</h2>
          </div>
          <ul className="header__user-list">
            <li className="header__user-item-main-page">
              <NavLink to="/" onClick={() => { showMenu('remove') }}>Main page</NavLink>
            </li>
            <li className="header__user-item-login">
              <NavLink to="/LogIn" onClick={() => { showMenu('remove') }}>Log in</NavLink>
            </li>
            <li className="header__user-item-register">
              <NavLink to="/Register" onClick={() => { showMenu('remove') }}>Register</NavLink>
            </li>
          </ul>
          <div className="header__logged-search-task">
            <label htmlFor="search-task">
              <input
                type="text"
                name="search-task"
                placeholder="Search task..."
                value={props.searchTasks}
                onChange={(e) => props.searchTask(e.target.value)}
              />
              <button>
                <i className="fas fa-search"></i>
              </button>
              <span>
                <i className="fas fa-times"></i>
              </span>
            </label>
          </div>
          <div className="header__logged-user-icon" onClick={showMenu}>
            <i className="fas fa-user-circle"></i>
          </div>
        </div>
      </header>
    </>
  );
};

const MSTP = (state) => {
  return {
    searchTasks: state.filters.searchTask,
  };
};

const MDTP = { searchTask };

export default connect(MSTP, MDTP)(Header);
