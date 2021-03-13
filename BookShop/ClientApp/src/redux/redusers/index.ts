import {combineReducers} from "redux";
//import {editBooksReducer} from "./booksReducers/editBooks";
import {fetchBookReduser} from "./booksReducers/fetchBooks";
import {userAuthReducer} from "./userReduser/auth";


export const rootReducer = combineReducers({
    fetchBook: fetchBookReduser,
    authUser: userAuthReducer
});

export type rootState = ReturnType<typeof rootReducer>;
