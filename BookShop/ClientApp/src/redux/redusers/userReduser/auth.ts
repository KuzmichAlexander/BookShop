import {userAuthActions, userState, userAuthAction} from "../../types/user/user";

const initialUserState: userState = {
    name: '',
    surname: '',
    email: '',
    login: '',
    token: '',
    error: null,
    loading: false
};

export const userAuthReduser = (state = initialUserState, action: userAuthAction): userState => {
    switch (action.type) {
        case userAuthActions.USER_AUTH:
            return {loading: true, error: null, name: '', surname: '', email: '', login: '', token: '',};
        case userAuthActions.USER_AUTH_SUCCESS:
            return {loading: false, error: null, login: action.payload.login, name: action.payload.name, token: action.payload.token, email: action.payload.email, surname: action.payload.surname}
        case userAuthActions.USER_AUTH_ERROR:
            return {loading: false, error: action.payload, login: '', name: '', token: '', surname: '', email: ''}
        default:
            return state;
    }
};
