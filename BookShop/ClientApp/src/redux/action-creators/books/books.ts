import {book, fetchBookAction, fetchBooksActions, fetchBooksOptions} from "../../types/book/book";
import {Dispatch} from "redux";
import axios from "axios";
import {baseUrl} from '../../../components/units/consts/consts';

export const fetchBooks = (options: fetchBooksOptions) => {
    return async function (dispatch: Dispatch<fetchBookAction>) {
        try {
            dispatch({type: fetchBooksActions.FETCH_BOOKS});

            const {data} = await axios.post(`${baseUrl}/api/Books`, options);

            console.log(data)
            dispatch({type: fetchBooksActions.FETCH_BOOKS_SUCCESS, payload: data});

        } catch (e) {
            dispatch({type: fetchBooksActions.FETCH_BOOKS_ERROR, payload: 'Сервер недоступен'});
        }
    };
};
