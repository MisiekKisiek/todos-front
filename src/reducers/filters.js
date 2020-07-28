export const filters = (state = { searchTask: "", filterDone: false, filterUndone: false }, action) => {
    switch (action.type) {
        case "SEARCH_TASK":
            return { searchTask: action.searchTask, filterDone: state.filterDone, filterUndone: state.filterUndone }
        case "FILTER_DONE":
            return { searchTask: state.searchTask, filterDone: action.filterDone, filterUndone: state.filterUndone };
        case "FILTER_UNDONE":
            return { searchTask: state.searchTask, filterDone: state.filterDone, filterUndone: action.filterUndone };
        default:
            return state
    }
}