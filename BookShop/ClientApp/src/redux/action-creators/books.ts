import {book, fetchBookAction, fetchBooksActions} from "../types/book/book";
import {Dispatch} from "redux";
import axios from "axios";

const url = 'Добавить URL';

const onebook:book = {
    name: 'Над пропостью Во Ржи',
    author: 'Джером Дэвид Сэлинджер',
    discription: 'Ну норм такая книжка (с) леш',
    rating: 9,
    subjectOpinion: 'почему пары с Куделиным идут по 6 часов?',
};

export const fetchBooks = () => {
    return async function(dispatch: Dispatch<fetchBookAction>) {
        try {
            dispatch({type: fetchBooksActions.FETCH_BOOKS});
            // const responce: book[] = await axios.get(url);
            // dispatch({type:fetchBooksActions.FETCH_BOOKS_SUCCESS, payload: responce});
            //throw new Error();
            setTimeout(() => {
                dispatch({type:fetchBooksActions.FETCH_BOOKS_SUCCESS, payload: [onebook]});
            }, 1500);
        } catch (e) {
            dispatch({type: fetchBooksActions.FETCH_BOOKS_ERROR, payload: 'Соси член (ошибка)'});
        }
    };
};
