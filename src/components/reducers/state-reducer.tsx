
export enum Actions {
    SET = "Set",
    RESET = "Reset"
}

export interface Action {
    type: Actions,
    payload: any;
}


const stateReducer = (state: any, action: Action) => {
    switch (action.type) {
        case Actions.SET:
            state = action.payload + 1;
            return state;
        case Actions.RESET:
            state = ''
            return state;
        default:
            return state;
    }
}

export default stateReducer;