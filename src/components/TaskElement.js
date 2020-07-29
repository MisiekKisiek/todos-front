import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { changeStatus, removeTask } from '../actions/index';

const TaskElement = (props) => {
    const { checked, task, id } = props.element
    const [check, setcheck] = useState(checked);

    return (<>
        <li className="main__logged-task">
            <div className="main__logged-task-checkbox">
                <label htmlFor={`task ${id}`}>
                    <input type="checkbox" name={`task ${id}`} value={checked} onChange={() => { props.changeStatus(id); setcheck(!check) }} />
                    <span></span>
                </label>
            </div>
            <div className={`main__logged-task-text ${checked ? "active" : ""}`}>{task}</div>
            <div className="main__logged-task-date">2020-07-20</div>
            <button className="main__logged-task-edit">
                <i class="fas fa-hammer"></i>
            </button>
            <button className="main__logged-task-delete" onClick={() => { props.removeTask(id) }}>
                <i class="fas fa-times"></i>
            </button>
        </li>
    </>);
}

const MDTP = { changeStatus, removeTask }

export default connect(null, MDTP)(TaskElement);