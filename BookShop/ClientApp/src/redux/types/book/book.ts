export enum fetchBooksActions {
    FETCH_BOOKS = 'FETCH_BOOKS',
    FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS',
    FETCH_BOOKS_ERROR = 'FETCH_BOOKS_ERROR'
};

export type book = {
    name: string;
    author: string;
    description: string;
    category: string;
    price: number;
    imageURL: string;
    genre: string
    edition: string;
    id: number;
}

export interface booksState {
    books: book[];
    loading: boolean;
    error: null | string;
}

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

export type fetchBooksOptions = {
    default: boolean;
    name?: string;
    priceAbove?: number;
    priceBelow?: number;
    genre?: string;
}
