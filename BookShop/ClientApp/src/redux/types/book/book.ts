export enum fetchBooksActions {
    FETCH_BOOKS = 'FETCH_BOOKS',
    FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS',
    FETCH_BOOKS_ERROR = 'FETCH_BOOKS_ERROR'
};

export type book = {
    name: string;
    author: string;
    discription: string;
    subjectOpinion: string;
    rating: number;
}

export interface booksState {
    books: book[];
    loading: boolean;
    error: null | string;
};

export type fetchBookAction = bookFetchAction | bookFetchSuccessAction | bookFetchErrorAction

interface bookFetchAction {
    type: fetchBooksActions.FETCH_BOOKS;
 }

interface bookFetchSuccessAction {
    type: fetchBooksActions.FETCH_BOOKS_SUCCESS;
    payload: book[];
}

interface bookFetchErrorAction {
    type: fetchBooksActions.FETCH_BOOKS_ERROR;
    payload: string
}
