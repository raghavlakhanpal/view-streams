import { combineReducers } from "redux";
//importing reducer from redux-form
//to add form data to store object
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
});
