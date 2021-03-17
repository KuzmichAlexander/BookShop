import {Dispatch} from "redux";
import {userAuthAction, userAuthActions} from "../../types/user/user";
import {baseUrl, token} from "../../../components/units/consts/consts";
import axios from "axios";

export const userAuth = (login: string, password: string) => {
    return async function (dispatch: Dispatch<userAuthAction>) {
        try {
            dispatch({type: userAuthActions.USER_AUTH});

            const {data} = await axios.post(`${baseUrl}/api/Auth`, {login, password});

            if (data.ok) {
                localStorage.setItem(token, data.token);
                dispatch({type: userAuthActions.USER_AUTH_SUCCESS, payload: data});
            } else {
                dispatch({type: userAuthActions.USER_AUTH_ERROR, payload: "Неверный логин или пароль"});
            }

        } catch (e) {
            dispatch({type: userAuthActions.USER_AUTH_ERROR, payload: 'Сервер не отвечает'});
        }
    };
};

export const tokenUserAuth = (token: string) => {
    return async function (dispatch: Dispatch<userAuthAction>) {
        try {
            dispatch({type: userAuthActions.USER_AUTH});
            const {data} = await axios.get(`${baseUrl}/api/Auth`, {headers: {Authorization: token}});
            if (data.ok) {
                dispatch({type: userAuthActions.USER_AUTH_SUCCESS, payload: data});
            } else {
                dispatch({type: userAuthActions.USER_AUTH_ERROR, payload: "Неверный логин или пароль"});
            }

        } catch (e) {
            dispatch({type: userAuthActions.USER_AUTH_ERROR, payload: 'Сервер не отвечает'});
        }
    };
};

export const userLoguot = () => {
    return function (dispatch: Dispatch<userAuthAction>) {
        localStorage.removeItem(token);
        dispatch({type: userAuthActions.USER_LOGOUT});
    }
}

type regData = {
    login: string;
    password: string;
    email: string
    name: string;
    surname: string;
}

export const userRegister = async (userRegData: regData) => {
    try {
        const {data} = await axios.post(`${baseUrl}/api/Registration`, userRegData);
        return data;
    } catch (e) {
        return 'Сервер не отвечает';
    }
};
