import React, { useState } from 'react';
import { connect } from 'react-redux';
import { changeStatus, removeTask, changeTask, changeDate } from '../actions/index';

const TaskElement = (props) => {
    const { checked, task, id, date } = props.element
    const [check, setcheck] = useState(checked);

    const [writeTask, setwriteTask] = useState(task);
    const [writeDate, setwriteDate] = useState(date);

    const [forceUpdate, setforceUpdate] = useState(1);

    const addActiveClassToTask = (e) => {
        const taskItem = e.target.parentNode.classList.contains('main__logged-task') ? e.target.parentNode : e.target.parentNode.parentNode;
        taskItem.classList.toggle('main__logged-task--edit')
    }

    const editTaskAndDate = (e, id) => {
        if (e.target.attributes.dataname.value === "accept") {
            props.changeTask(writeTask, id);
            props.changeDate(writeDate, id);
            setforceUpdate(forceUpdate + 1)
        }
        else if (e.target.attributes.dataname.value === "discard") {
            setwriteTask(task)
            setwriteDate(date)
        }
        // setwriteTask(task);
        // setwriteDate(date);
    }

    return (<>
        <li className="main__logged-task">
            <div className="main__logged-task-checkbox">
                <label htmlFor={`task ${id}`}>
                    <input type="checkbox" name={`task ${id}`} value={checked} defaultChecked={checked}
                        onChange={
                            () => {
                                props.changeStatus(id);
                                setcheck(!check)
                            }} />
                    <span></span>
                </label>
            </div>
            <div className={`main__logged-task-text ${checked ? "active" : ""}`}>
                <span>{task}</span>
                <textarea type="textarea" value={writeTask}
                    onChange={
                        (e) => {
                            setwriteTask(e.target.value)
                        }} />
            </div>
            <div className="main__logged-task-date">
                <span>{date}</span>
                <input type="date" value={writeDate}
                    onChange={
                        (e) => {
                            setwriteDate(e.target.value ? e.target.value : "Add deadline")
                        }} />
            </div>
            <button className="main__logged-task-edit" onClick={
                (e) => {
                    addActiveClassToTask(e)
                }}>
                <i className="fas fa-hammer" ></i>
            </button>
            <button className="main__logged-task-edit-accept" dataname="accept"
                onClick={
                    (e) => {
                        addActiveClassToTask(e);
                        editTaskAndDate(e, id)
                    }}>
                <i className="fas fa-check" dataname="accept"></i>
            </button>
            <button className="main__logged-task-edit-discard" dataname="discard"
                onClick={
                    (e) => {
                        addActiveClassToTask(e);
                        editTaskAndDate(e, id)
                    }}>
                <i className="fas fa-times" dataname="discard"></i>
            </button>
            <button className="main__logged-task-delete" onClick={() => { props.removeTask(id) }}>
                <i className="fas fa-times"></i>
            </button>
        </li>
    </>);
}

const MDTP = { changeStatus, removeTask, changeTask, changeDate }

export default connect(null, MDTP)(TaskElement);