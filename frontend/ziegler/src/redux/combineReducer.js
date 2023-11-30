import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { addProductReducer } from "./addProductReducer"

export const combineReducer = combineReducers({ userReducer: userReducer, addProductReducer: addProductReducer });