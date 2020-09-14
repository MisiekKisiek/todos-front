import React, { useState, useEffect } from "react";

import TaskElement from "./TaskElement";

import { connect } from "react-redux";
import { searchTask, filterDone, filterUndone } from "../actions/index";

import { APIPrefix as API } from "../tools/apiPrefixes";

const MainPageLogged = (props) => {
  const { handleMessagePopup } = props;

  const [writeTask, setwriteTask] = useState("");
  const [writeSearchTask, setwriteSearchTask] = useState("");

  const handleLogoLight = () => {
    const logo = document.querySelector(".header__img");
    logo.classList.add("active");
    setTimeout(() => {
      logo.classList.remove("active");
    }, 1000);
  };

  const handleAddButtonLoading = (action) => {
    const loading = document.querySelector(".main__loading-btn");
    if (action === "remove") loading.classList.remove("active");
    else if (action === "add") loading.classList.add("active");
  };

  const handleInputs = (e) => {
    if (e.target.name === "add-task") {
      setwriteTask(e.target.value);
    } else if (e.target.name === "search-task") {
      setwriteSearchTask(e.target.value);
    } else if (e.target.name === "filter-done") {
      props.filterDone(e.target.checked);
    } else if (e.target.name === "filter-undone") {
      props.filterUndone(e.target.checked);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    const loading = setTimeout(() => {
      handleAddButtonLoading("add");
    }, 500);
    await fetch(`${API}/tasks/addTask`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        task: writeTask,
      }),
    })
      .then((e) => e.json())
      .then((e) => {
        setwriteTask("");
        handleLogoLight();
        clearTimeout(loading);
        handleAddButtonLoading("remove");
        handleMessagePopup("Task has been added successfully.");
        props.getAllTasks();
      })
      .catch((err) => {
        handleMessagePopup("We occure an error.");
        clearTimeout(loading);
        handleAddButtonLoading("remove");
        props.getAllTasks();
      });
  };

  const removeTask = async (taskID) => {
    await fetch(`${API}/tasks/removeTask`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      mode: "cors",
      body: JSON.stringify(taskID),
    })
      .then((e) => e.json())
      .then((res) => {
        props.getAllTasks();
        handleMessagePopup("Task has been removed successfully.");
      })
      .catch((err) => {
        props.getAllTasks();
        handleMessagePopup("We occure an error.");
      });
  };

  const editTask = async (changedTask) => {
    await fetch(`${API}/tasks/editTask`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      mode: "cors",
      body: JSON.stringify(changedTask),
    })
      .then((e) => e.json())
      .then((res) => {
        props.getAllTasks();
      })
      .catch((err) => {
        handleMessagePopup("We occure an error with edit.");
        props.getAllTasks();
      });
  };

  useEffect(() => {
    props.getAllTasks();
  }, []);

  const searchTaskElement = (e) => {
    e.preventDefault();
    props.searchTask(writeSearchTask);
  };

  const clearInputValues = (e) => {
    if (e.target.attributes.dataname.value === "add-task") {
      setwriteTask("");
    }
    if (e.target.attributes.dataname.value === "search-task") {
      setwriteSearchTask("");
      props.searchTask("");
    }
  };

  const showAllTasks = (taskArray) => {
    let taskList = [...taskArray];
    if (!props.filterDoneTasks) {
      taskList = taskList.filter((e) => e.checked === false);
    }
    if (!props.filterUndoneTasks) {
      taskList = taskList.filter((e) => e.checked === true);
    }
    if (props.searchTasks) {
      taskList = taskList.filter((e) =>
        `${e.task}${e.deadline}`
          .toLowerCase()
          .includes(props.searchTasks.toLowerCase())
      );
    }
    const sortFunc = (a, b) => {
      if (a.deadline === "Add deadline") {
        return 1;
      } else {
        return Date.parse(a.deadline) - Date.parse(b.deadline);
      }
    };
    const taskChecked = taskList.filter((e) => e.checked).sort(sortFunc);
    const taskUnchecked = taskList.filter((e) => !e.checked).sort(sortFunc);
    taskList = taskUnchecked.concat(taskChecked);
    taskList = taskList.map((e) => (
      <TaskElement
        element={e}
        key={e._id}
        removeTask={removeTask}
        editTask={editTask}
      ></TaskElement>
    ));
    return taskList;
  };

  return (
    <>
      <div className="main__logged-wrap">
        <aside className="main__logged-nav">
          <div action="" className="main__logged-form">
            <form className="main__logged-add-task">
              <label htmlFor="add-task">
                <input
                  type="text"
                  name="add-task"
                  placeholder="Add task..."
                  value={writeTask}
                  onChange={(e) => {
                    handleInputs(e);
                  }}
                />
                <button
                  className="main__add-btn"
                  type="submit"
                  onClick={(e) => {
                    addTask(e);
                  }}
                >
                  <i className="fas fa-plus"></i>
                </button>
                <div className="main__loading-btn">
                  <i className="fas fa-spinner"></i>
                </div>
                <span
                  dataname="add-task"
                  onClick={(e) => {
                    clearInputValues(e);
                  }}
                >
                  <i className="fas fa-times" dataname="add-task"></i>
                </span>
              </label>
            </form>

            <form className="main__logged-search-task">
              <label htmlFor="search-task">
                <input
                  type="text"
                  name="search-task"
                  placeholder="Search task..."
                  value={writeSearchTask}
                  onChange={(e) => {
                    handleInputs(e);
                  }}
                />
                <button
                  type="submit"
                  onClick={(e) => {
                    searchTaskElement(e);
                  }}
                >
                  <i className="fas fa-search"></i>
                </button>
                <span
                  dataname="search-task"
                  onClick={(e) => {
                    clearInputValues(e);
                  }}
                >
                  <i className="fas fa-times" dataname="search-task"></i>
                </span>
              </label>
            </form>
            <div className="main__logged-filter">
              <label htmlFor="filter-done">
                <input
                  type="checkbox"
                  name="filter-done"
                  defaultChecked
                  value={props.filterDoneTasks}
                  onChange={(e) => {
                    handleInputs(e);
                  }}
                />
                <span></span>
                <p>Show done tasks</p>
              </label>
            </div>
            <div className="main__logged-filter">
              <label htmlFor="filter-undone">
                <input
                  type="checkbox"
                  name="filter-undone"
                  defaultChecked
                  value={props.filterUndoneTasks}
                  onChange={(e) => {
                    handleInputs(e);
                  }}
                />
                <span></span>
                <p>Show undone tasks</p>
              </label>
            </div>
          </div>
        </aside>
        <section className="main__logged-tasks">
          <div className="main__logged-tasks-wrap">
            <ul className="main__logged-tasks-list">
              {showAllTasks(props.allTasks)}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

const MSTP = (state) => {
  return {
    searchTasks: state.filters.searchTask,
    filterDoneTasks: state.filters.filterDone,
    filterUndoneTasks: state.filters.filterUndone,
    allTasks: state.allTasks,
    state: state,
  };
};

const MDTP = { searchTask, filterDone, filterUndone };

export default connect(MSTP, MDTP)(MainPageLogged);
