import React from 'react';
import { NavLink } from 'react-router-dom'

const UserPanel = () => {
    return (<>
        <div className="user-panel">
            <div className="user-panel__wrap">
                <nav className="user-panel__main-page-nav">
                    <NavLink to="/">
                        <i className="fas fa-arrow-left"></i> Go back to{" "}
                        <span>Main Page</span>
                    </NavLink>
                </nav>
                <div className="user-panel__photo">
                    <img src={require('../img/user.png')} alt="userphoto" />
                </div>
                <div className="user-panel__login">
                    User:<span> {localStorage.getItem('user')}</span>
                </div>
                <div className="user-panel__email">
                    e-mail:<span> {localStorage.getItem('email')}</span>
                </div>
            </div>
        </div>
    </>);
}

export default UserPanel;