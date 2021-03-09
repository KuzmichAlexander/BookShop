import {book, fetchBookAction, fetchBooksActions} from "../../types/book/book";
import {Dispatch} from "redux";
import axios from "axios";
import {userState, fetchedUser, userAuthActions, userAuthAction} from "../../types/user/user";

const url = 'Добавить URL'; //!!!!

const oneuser: fetchedUser = {
    name: 'Аркадий',
    surname: 'Валерьянков',
    email: 'arckashka777@mail.ru',
    login: 'arckashka777',
    token: '$UrgJOstydtgFJKFHEEseghtgIOR@)#FERSFE54t4e5atsfwtf5gse'
};

export const userAuth = () => {
    return async function(dispatch: Dispatch<userAuthAction>) {
        try {
            dispatch({type: userAuthActions.USER_AUTH});

            // const responce: book[] = await axios.get(url);
            // dispatch({type:fetchBooksActions.FETCH_BOOKS_SUCCESS, payload: responce});
            //throw new Error();
            console.log(oneuser)

            setTimeout(() => {
                dispatch({type:userAuthActions.USER_AUTH_SUCCESS, payload: oneuser});
            }, 1500);

        } catch (e) {
            dispatch({type: userAuthActions.USER_AUTH_ERROR, payload: 'Соси член (наверно такого юзера нету :c)'});
        }
    };
};
