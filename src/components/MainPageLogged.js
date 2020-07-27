import React, { Component } from 'react';

class MainPageLogged extends Component {
    state = {}
    render() {
        return (<>
            <div className="main__logged-wrap">
                <nav className="main__logged-nav">
                    <form action="" className="main__logged-form">
                        <div className="main__logged-add-task">
                            <label htmlFor="add-task">
                                <input type="text" name="add-task" placeholder="Add task..." />
                            </label>
                            <button><i class="fas fa-plus"></i></button>
                        </div>
                        <div className="main__logged-search-task">
                            <label htmlFor="search-task">
                                <input type="text" name="search-task" placeholder="Search task..." />
                            </label>
                            <button><i class="fas fa-search"></i></button>
                        </div>
                    </form>
                </nav>
                <section className="main__logged-tasks">

                </section>
            </div></>);
    }
}

export default MainPageLogged;