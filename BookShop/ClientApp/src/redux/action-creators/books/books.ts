import {book, fetchBookAction, fetchBooksActions, fetchBooksOptions} from "../../types/book/book";
import {Dispatch} from "redux";
import axios from "axios";
import {baseUrl} from '../../../components/units/consts/consts';
import {order, orderBooksActions} from "../../types/book/Basket";

export const fetchBooks = (options: fetchBooksOptions) => {
    return async function (dispatch: Dispatch<fetchBookAction>) {
        try {
            dispatch({type: fetchBooksActions.FETCH_BOOKS});

            const {data} = await axios.post(`${baseUrl}/api/Books`, options);

            dispatch({type: fetchBooksActions.FETCH_BOOKS_SUCCESS, payload: data});

        } catch (e) {
            dispatch({type: fetchBooksActions.FETCH_BOOKS_ERROR, payload: 'Сервер недоступен'});
        }
    };
};

export const addBookToBasket = (order:order) => {
    return ({
        type: orderBooksActions.ADD_BOOK,
        payload: order
    });
};

export const removeBookFromBasket = (id: number) => {
    return {
        type: orderBooksActions.REMOVE_BOOK,
        payload: id
    };
};
