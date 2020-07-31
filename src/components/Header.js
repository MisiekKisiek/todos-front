import React from 'react';

import { searchTask } from '../actions'
import { connect } from 'react-redux';

const Header = (props) => {

    // const smallHeaderScroll = () => {
    //     const header = document.querySelector('.header');
    //     if (window.pageYOffset > 1) {
    //         header.classList.add('active')
    //     } else if (window.pageYOffset > 1) {
    //         header.classList.remove('active')
    //     }
    // }

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
                <div className="header__logged-search-task">
                    <label htmlFor="search-task">
                        <input type="text" name="search-task" placeholder="Search task..." value={props.searchTasks} onChange={(e) => props.searchTask(e.target.value)} />
                        <button>
                            <i className="fas fa-search"></i>
                        </button>
                        <span>
                            <i className="fas fa-times"></i>
                        </span>
                    </label>

                </div>
            </div>
        </header>
    </>);
}

const MSTP = state => {
    return ({
        searchTasks: state.filters.searchTask
    })
}

const MDTP = { searchTask }

export default connect(MSTP, MDTP)(Header);
