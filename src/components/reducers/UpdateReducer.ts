import { useHistory } from "react-router-dom";

export enum Update {
  UPDATE = "Update",
}

const updateReducer = (state: boolean = false, action: { type: Update }) => {
  switch (action.type) {
    case Update.UPDATE:
      Updater();
      return true;

    default:
      return state;
  }
};

function Updater() {}

export default updateReducer;
