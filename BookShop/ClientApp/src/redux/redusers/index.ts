import {combineReducers} from "redux";
//import {editBooksReduser} from "./booksReducers/editBooks";
import {fetchBookReduser} from "./booksReducers/fetchBooks";
import {userAuthReduser} from "./userReduser/auth";


export const rootReducer = combineReducers({
    fetchBook: fetchBookReduser,
    authUser: userAuthReduser
});

export type rootState = ReturnType<typeof rootReducer>;
