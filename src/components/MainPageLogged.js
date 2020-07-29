import React, { useState } from 'react';
import uuid from 'react-uuid';

import TaskElement from './TaskElement';

import { connect } from 'react-redux';
import { searchTask, filterDone, filterUndone, addTask, changeStatus } from '../actions/index'


const MainPageLogged = (props) => {

    const [writeTask, setwriteTask] = useState("")

    const handleInputs = (e) => {
        if (e.target.name === "add-task") {
            setwriteTask(e.target.value)
        } else if (e.target.name === "search-task") {
            props.searchTask(e.target.value)
        } else if (e.target.name === "filter-done") {
            props.filterDone(e.target.checked)
        }
        else if (e.target.name === "filter-undone") {
            props.filterUndone(e.target.checked)
        }
    }

    const addTaskElement = (e) => {
        e.preventDefault();
        props.addTask(writeTask, uuid());
        setwriteTask("")
        console.log(props.state)
    }

    const showAllTasks = (taskArray) => {
        const taskList = taskArray.map(e =>
            <TaskElement element={e} key={e.id} t={props.changeStatus}></TaskElement>
        )
        return taskList
    }

    return (<>
        <div className="main__logged-wrap">
            <nav className="main__logged-nav">
                <form action="" className="main__logged-form">
                    <div className="main__logged-add-task">
                        <label htmlFor="add-task">
                            <input type="text" name="add-task" placeholder="Add task..." value={writeTask} onChange={(e) => { handleInputs(e) }} />
                        </label>
                        <button onClick={(e) => { addTaskElement(e) }}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    <div className="main__logged-search-task">
                        <label htmlFor="search-task">
                            <input type="text" name="search-task" placeholder="Search task..." value={props.searchTasks} onChange={(e) => { handleInputs(e) }} />
                        </label>
                        <button><i className="fas fa-search"></i></button>
                    </div>
                    <div className="main__logged-filter">
                        <label htmlFor="filter-done">
                            <input type="checkbox" name="filter-done"
                                value={props.filterDoneTasks}
                                onChange={(e) => { handleInputs(e) }}
                            />
                            <span></span>
                            <p>Filter done tasks</p>
                        </label>
                    </div>
                    <div className="main__logged-filter">
                        <label htmlFor="filter-undone">
                            <input type="checkbox" name="filter-undone" value={props.filterUndoneTasks} onChange={(e) => { handleInputs(e) }} />
                            <span></span>
                            <p>Filter undone tasks</p>
                        </label>
                    </div>
                </form>
            </nav>
            <section className="main__logged-tasks">
                <div className="main__logged-tasks-wrap">
                    <ul className="main__logged-tasks-list">
                        {showAllTasks(props.allTasks)}
                    </ul>
                </div>
            </section>
        </div>
    </>);
}

const MSTP = state => {
    return ({
        searchTasks: state.filters.searchTask,
        filterDoneTasks: state.filters.filterDone,
        filterUndoneTasks: state.filters.filterUndone,
        allTasks: state.allTasks,
        state: state
    })
}

const MDTP = { searchTask, filterDone, filterUndone, addTask, changeStatus }

export default connect(MSTP, MDTP)(MainPageLogged);
