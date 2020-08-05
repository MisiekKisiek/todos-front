export const allTasks = (state = [], action) => {
    switch (action.type) {
        case "ADD_TASK":
            return [...state, { task: action.task, id: action.id, date: action.date, checked: false }]
        case "CHANGE_STATUS":
            {
                const ele = [...state]
                ele[state.findIndex(e => e.id === action.checkedId)].checked = !ele[state.findIndex(e => e.id === action.checkedId)].checked;
                return ele
            }
        case "CHANGE_TASK":
            {
                const ele = [...state]
                ele[state.findIndex(e => e.id === action.taskId)].task = action.task
                return ele
            }
        case "CHANGE_DATE":
            {
                const ele = [...state]
                ele[state.findIndex(e => e.id === action.dateId)].date = action.date
                return ele
            }
        case "REMOVE_TASK":
            {
                const ele = [...state]
                ele.splice([state.findIndex(e => e.id === action.removeId)], 1);
                return ele
            }
        case "GET_TASKS":
            {
                console.log(action.wholeTasks)
                return action.wholeTasks
            }
        default:
            return state
    }
}