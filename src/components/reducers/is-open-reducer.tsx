
export enum OC {
    OPEN,
    CLOSE
}

export interface Action {
    type: OC,
    payload: any;
}


const isOpenReducer = (state: any, action: Action) => {
    switch (action.type) {
        case OC.OPEN:
            state = true;
            return state;
        case OC.CLOSE:
            state = false
            return state;
        default:
            return state;
    }
}

export default isOpenReducer;