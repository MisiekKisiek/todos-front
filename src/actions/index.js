export const addTask = (task) => ({
    type: "ADD_TASK",
    task
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