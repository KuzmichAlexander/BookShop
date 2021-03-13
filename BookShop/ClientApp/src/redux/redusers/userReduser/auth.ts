import {userAuthAction, userAuthActions, userState} from "../../types/user/user";

const initialUserState: userState = {
    name: '',
    surname: '',
    email: '',
    login: '',
    token: '',
    error: null,
    loading: false,
    isAdmin: false
};

export const userAuthReducer = (state = initialUserState, action: userAuthAction): userState => {
    switch (action.type) {
        case userAuthActions.USER_AUTH:
            return {loading: true, error: null, name: '', surname: '', email: '', login: '', token: '', isAdmin: false};
        case userAuthActions.USER_AUTH_SUCCESS:
            return {
                loading: false,
                error: null,
                login: action.payload.login,
                name: action.payload.name,
                token: action.payload.token,
                email: action.payload.email,
                surname: action.payload.surname,
                isAdmin: action.payload.isAdmin
            }
        case userAuthActions.USER_AUTH_ERROR:
            return {loading: false, error: action.payload, login: '', name: '', token: '', surname: '', email: '', isAdmin: false}
        case userAuthActions.USER_LOGOUT:
            return {loading: false, error: null, name: '', surname: '', email: '', login: '', token: '', isAdmin: false}
        default:
            return state;
    }
};
