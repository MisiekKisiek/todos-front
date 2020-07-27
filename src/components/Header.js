import React from 'react';

const Header = () => {
    return (<>
        <header className="header">
            <div className="header__wrap">
                <div className="header__logo">
                    <div className="header__image">
                        <img src={require("../img/logo.png")} alt="" />
                    </div>
                    <h2 className="header__title">toDos App</h2>
                </div>
                <ul className="header__user-list">
                    <li className="header__user-item-login">Log in</li>
                    <li className="header__user-item-register">Register</li>
                </ul>
            </div>
        </header>
    </>);
}

export default Header;