export const addTask = (task, id, date = '') => ({
    type: "ADD_TASK",
    task,
    id,
    date
})

export const changeStatus = (checkedId) => ({
    type: "CHANGE_STATUS",
    checkedId
})

export const changeTask = (task, taskId) => ({
    type: "CHANGE_TASK",
    task,
    taskId
})

export const changeDate = (date, dateId) => ({
    type: 'CHANGE_DATE',
    date,
    dateId
})

export const removeTask = (removeId) => ({
    type: "REMOVE_TASK",
    removeId
})

export const getAllTasks = (wholeTasks) => ({
    type: "GET_TASKS",
    wholeTasks
})

export const searchTask = (searchTask) => ({
    type: "SEARCH_TASK",
    searchTask
})

export const filterDone = (filterDone) => ({
    type: "FILTER_DONE",
    filterDone
})

export const filterUndone = (filterUndone) => ({
    type: "FILTER_UNDONE",
    filterUndone
})