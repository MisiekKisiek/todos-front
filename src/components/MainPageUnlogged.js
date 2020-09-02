import React from 'react';
import { NavLink } from 'react-router-dom';

const MainPageUnlogged = () => {
    return (<>
        <div className="main__unlogged">
            <nav className="main__unlogged-wrap">
                <h1 className="main__unlogged-title">Organize your work like a master! </h1>
                <h2 className="main__unlogged-login">Just <NavLink to="/LogIn">Login</NavLink></h2>
                <h2 className="main__unlogged-register">or if You don't have account <NavLink to='/Register'>Register</NavLink>.</h2>
            </nav>
        </div>
    </>);
}

export default MainPageUnlogged;