export const allTasks = (state = [], action) => {
    switch (action.type) {
        case "ADD_TASK":
            return [...state, { task: action.task, id: action.id, checked: false }]
        case "CHANGE_STATUS":
            {
                const ele = [...state]
                ele[state.findIndex(e => e.id === action.checkedId)].checked = !ele[state.findIndex(e => e.id === action.checkedId)].checked;
                return ele
            }
        case "REMOVE_TASK":
            {
                const ele = [...state]
                ele.splice([state.findIndex(e => e.id === action.removeId)], 1);
                return ele
            }
        default:
            return state
    }
}