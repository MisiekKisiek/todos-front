import React, { useState } from 'react';
import { connect } from 'react-redux';
import { changeStatus, removeTask, changeTask, changeDate } from '../actions/index';

const TaskElement = (props) => {
    const { checked, task, _id, deadline } = props.element
    const [check, setcheck] = useState(checked);

    const [writeTask, setwriteTask] = useState(task);
    const [writeDate, setwriteDate] = useState(deadline);

    const [forceUpdate, setforceUpdate] = useState(1);

    const addActiveClassToTask = (e) => {
        const taskItem = e.target.parentNode.classList.contains('main__logged-task') ? e.target.parentNode : e.target.parentNode.parentNode;
        taskItem.classList.toggle('main__logged-task--edit')
    }

    return (<>
        <li className="main__logged-task">
            <div className="main__logged-task-checkbox">
                <label htmlFor={`task ${_id}`}>
                    <input type="checkbox" name={`task ${_id}`} value={checked} defaultChecked={checked}
                        onChange={
                            () => {
                                const changedTask = { taskID: _id, task: writeTask, deadline: writeDate, checked: !check }
                                props.editTask({ changedTask });
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
                <span>{deadline}</span>
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
                        const changedTask = { taskID: _id, task: writeTask, deadline: writeDate, checked: check };
                        console.log(changedTask)
                        props.editTask({ changedTask });
                    }}>
                <i className="fas fa-check" dataname="accept"></i>
            </button>
            <button className="main__logged-task-edit-discard" dataname="discard"
                onClick={
                    (e) => {
                        addActiveClassToTask(e);
                    }}>
                <i className="fas fa-times" dataname="discard"></i>
            </button>
            <button className="main__logged-task-delete" onClick={() => { const removeTask = { taskID: _id }; props.removeTask(removeTask) }}>
                <i className="fas fa-times"></i>
            </button>
        </li>
    </>);
}

const MDTP = { changeStatus, changeTask, changeDate }

export default connect(null, MDTP)(TaskElement);