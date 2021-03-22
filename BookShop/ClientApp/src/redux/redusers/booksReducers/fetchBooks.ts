import {fetchBooksActions, booksState, fetchBookAction, fetchedBookType} from "../../types/book/book";

const initialState: booksState = {
    books: [],
    loading: false,
    error: null
};

export const fetchBookReduser = (state = initialState, action: fetchBookAction) : booksState=> {
    switch (action.type) {
        case fetchBooksActions.FETCH_BOOKS:
            return {loading: true, error: null, books: []};
        case fetchBooksActions.FETCH_BOOKS_SUCCESS:
            return {loading: false, error: null, books: action.payload}
        case fetchBooksActions.FETCH_BOOKS_ERROR:
            return {loading: false, error: action.payload, books: []};
        default:
            return state;
    }
};
