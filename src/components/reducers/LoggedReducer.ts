
export enum Logged {
  SIGN_IN = "Sign In",
  SIGN_OUT = "Sign Out",
}


export interface Action {
  type: Logged,
  payload: any;
}


const loggedReducer = (state: boolean = false, action: Action) => {
  switch (action.type) {
    case Logged.SIGN_IN:
      sessionStorage.setItem("isLogged", "true");
      sessionStorage.setItem("user", JSON.stringify(action.payload.user))
      return true;

    case Logged.SIGN_OUT:
      sessionStorage.setItem("isLogged", "false");
      sessionStorage.removeItem('user');
      return false;

    default:
      return state;
  }
};

export default loggedReducer;
