export const addTask = (task, id) => ({
    type: "ADD_TASK",
    task,
    id
})

export const changeStatus = (checkedId) => ({
    type: "CHANGE_STATUS",
    checkedId
})

export const removeTask = (removeId) => ({
    type: "REMOVE_TASK",
    removeId
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