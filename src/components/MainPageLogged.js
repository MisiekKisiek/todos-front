import React, { Component } from 'react';

import { connect } from 'react-redux';
import { searchTask, filterDone, filterUndone } from '../actions/index'

class MainPageLogged extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addTask: "",
            searchTask: "",
            filterDoneTasks: true,
            filterUndoneTasks: true,
        }
    }

    handleInputs = (e) => {
        if (e.target.name === "add-task") {
            this.setState({
                addTask: e.target.value
            })
        } else if (e.target.name === "search-task") {
            this.setState({
                searchTask: e.target.value
            })
        } else if (e.target.name === "filter-done") {
            this.setState({
                filterDoneTasks: e.target.checked
            })
        }
        else if (e.target.name === "filter-undone") {
            this.setState({
                filterUndoneTasks: e.target.checked
            })
        }
    }

    render() {
        return (<>
            <div className="main__logged-wrap">
                <nav className="main__logged-nav">
                    <form action="" className="main__logged-form">
                        <div className="main__logged-add-task">
                            <label htmlFor="add-task">
                                <input type="text" name="add-task" placeholder="Add task..." value={this.state.addTask} onChange={(e) => { this.handleInputs(e) }} />
                            </label>
                            <button><i className="fas fa-plus"></i></button>
                        </div>
                        <div className="main__logged-search-task">
                            <label htmlFor="search-task">
                                <input type="text" name="search-task" placeholder="Search task..." value={this.state.searchTask} onChange={(e) => { this.handleInputs(e) }} />
                            </label>
                            <button><i className="fas fa-search"></i></button>
                        </div>
                        <div className="main__logged-filter">
                            <label htmlFor="filter-done">
                                <input type="checkbox" name="filter-done"
                                    value={this.state.filterDoneTasks}
                                    onChange={(e) => { this.handleInputs(e) }}
                                />
                                <span></span>
                                <p>Filter done tasks</p>
                            </label>
                        </div>
                        <div className="main__logged-filter">
                            <label htmlFor="filter-undone">
                                <input type="checkbox" name="filter-undone" value={this.state.filterUndoneTasks} onChange={(e) => { this.handleInputs(e) }} />
                                <span></span>
                                <p>Filter undone tasks</p>
                            </label>
                        </div>
                    </form>
                </nav>
                <section className="main__logged-tasks">
                    <div className="main__logged-tasks-wrap">
                        <ul className="main__logged-tasks-list">
                            <li className="main__logged-task">
                                <div className="main__logged-task-radio">
                                    <label htmlFor="done-task">
                                        <input type="radio" name="done-task" value="1" />
                                        <span></span>
                                    </label>
                                </div>
                                <div className="main__logged-task-text">Lorem ipsum dolor sit,</div>
                                <div className="main__logged-task-date">2020-07-20</div>
                            </li>
                            <li className="main__logged-task">
                                <div className="main__logged-task-radio">
                                    <label htmlFor="done-task">
                                        <input type="radio" name="done-task" value="2" />
                                        <span></span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </div></>);
    }
}

const MSTP = state => {
    return ({ searchTask: state.filters.searchTask, filterDone: state })
}

const MDTP = { searchTask, filterDone, filterUndone }

export default connect(MSTP, MDTP)(MainPageLogged);
