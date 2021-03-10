import {book, fetchBooksActions} from "../book/book";

export enum userAuthActions {
    USER_AUTH = 'USER_AUTH',
    USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS',
    USER_AUTH_ERROR = 'USER_AUTH_ERROR',
    USER_LOGOUT = 'USER_LOGOUT'
};

export interface userState {
    name: string;
    login: string;
    surname: string;
    email: string;
    token: null | string;
    error: null | string;
    loading: boolean;
};

export type fetchedUser = {
    login: string;
    name: string;
    token: string;
    surname: string;
    email: string;
    ok: boolean;
}

export type userAuthAction = authUserAction | authUserSuccessAction | authUserErrorAction | logoutUserAction

interface authUserAction {
    type: userAuthActions.USER_AUTH;
}

interface logoutUserAction {
    type: userAuthActions.USER_LOGOUT;
}

interface authUserSuccessAction {
    type: userAuthActions.USER_AUTH_SUCCESS;
    payload: fetchedUser;
}

interface authUserErrorAction {
    type: userAuthActions.USER_AUTH_ERROR;
    payload: string
}


