export const allTasks = (state = [], action) => {
    switch (action.type) {
        case "GET_TASKS":
            return action.wholeTasks
        default:
            return state
    }
}