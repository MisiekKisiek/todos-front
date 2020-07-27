export const addTask = (state = [], action) => {
    switch (action.type) {
        case "ADD_TASK":
            return action.task

        default:
            return state
    }
}