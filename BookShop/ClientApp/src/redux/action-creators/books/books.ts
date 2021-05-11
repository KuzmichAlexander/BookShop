import {book, fetchBookAction, fetchBooksActions, fetchBooksOptions, fetchedBookType} from "../../types/book/book";
import {Dispatch} from "redux";
import axios from "axios";
import {baseUrl} from '../../../utils/consts/consts';
import {order, orderBooksActions} from "../../types/book/Basket";

export const fetchBooks = (options: fetchBooksOptions) => {
    return async function (dispatch: Dispatch<fetchBookAction>) {
        try {
            if (!options.priceAbove) {
                options.priceAbove = 0;
            }
            if (!options.priceBelow) {
                options.priceBelow = 0;
            }
            dispatch({type: fetchBooksActions.FETCH_BOOKS});

            const response  = await axios.post(`${baseUrl}/api/Books`, options);
            const data: fetchedBookType[] = response.data;
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

export const getsBookFromBasket = () => {
    return {
        type: orderBooksActions.GET_BOOKS_FROM_LOCALSTORAGE
    };
};

export const clearBasket = () => {
    return {
        type: orderBooksActions.CLEAR_BASKET
    };
};



