import React from 'react';
import {useActions} from "../../../hooks/useActions";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {Loader} from "../../units/Loader";
import {Book} from "./Book";

export const BooksContainer = () => {
    const {loading, error, books} = useTypeSelector(state => state.fetchBook);
    //console.log(books)
    return (
        <div className={'books-container'}>
            {loading ? <Loader width={200} color={"green"}/> : null}
            {error ? <p className={'message-warning'}>{error}</p> : null}
            {books.map(book => <Book key={book.id} {...book} />)}
        </div>
    );
};


