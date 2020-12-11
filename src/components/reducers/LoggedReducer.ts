import axios from "../api/axios";

export enum Logged {
    SIGN_IN = "Sign In",
    SIGN_OUT = "Sign Out",
  }
  

const loggedReducer = (state: boolean = false, action: { type: Logged }) => {
  switch (action.type) {
    case Logged.SIGN_IN:
        localStorage.setItem("isLogged", "true")
        return true;

    case Logged.SIGN_OUT:
        localStorage.setItem("isLogged", "false");
        sessionStorage.removeItem("username");
        return false;

    default:    
      return state;
  }
};

async function setTrueOrFalse(value: string) {
    const res = await axios.patch('isLogged/1', {"isLogged": `${value}`});
    console.log("Patch: ", res);
  }

export default loggedReducer;
