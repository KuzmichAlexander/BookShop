import {combineReducers} from "redux";
import {fetchBookReduser} from "./booksReducers/fetchBooks";
import {userAuthReducer} from "./userReduser/auth";
import {BookStorageReduсer} from "./booksReducers/BookStorage";


export const rootReducer = combineReducers({
    fetchBook: fetchBookReduser,
    authUser: userAuthReducer,
    booksBasket: BookStorageReduсer
});

export type rootState = ReturnType<typeof rootReducer>;
