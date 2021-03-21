import {CustomLabel} from "../../units/CustomLabel";
import React, {useEffect, useState} from "react";
import {addNewBook, getAuthors, getCities, getEditions, getGenres} from "../../../DAL/api";
import {renderItems} from "../../units/OrderElement";


export const AddBook = () => {
    const [bookName, setBookName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imageURL, setImageURL] = useState<string>('');

    const [price, setPrice] = useState<string>('0');
    const [validPrice, setValidPrice] = useState<boolean>(false);

    const [pages, setPages] = useState<string>('0');
    const [validPages, setValidPages] = useState<boolean>(false);

    const [edition, setEdition] = useState<string>('');
    const [editionsArray, setEditionsArray] = useState<string[]>([]);

    const [author, setAuthor] = useState<string>('');
    const [authorsArray, setAuthorsArray] = useState<string[]>([]);

    const [genre, setGenre] = useState<string>('');
    const [genresArray, setGenresArray] = useState<string[]>([]);

    const [serverAnswer, setServerAnswer] = useState('');


    useEffect(() => {
        fetchEditions();
        fetchAuthors();
        fetchGenres();
    }, []);

    const priceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValidPrice(false);
        let value = e.target.value;

        if (!isNaN(+value) && +value >= 0) {
            setPrice(value);
            return;
        }
        setValidPrice(true);
    }

    const pagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValidPages(false);
        let value = e.target.value;

        if (!isNaN(+value) && +value >= 0) {
            setPages(value);
            return;
        }
        setValidPages(true);
    }

    const fetchEditions = async () => {
        const editions = await getEditions();
        setEditionsArray(editions);
    }

    const fetchAuthors = async () => {
        const authors = await getAuthors();
        setAuthorsArray(authors);
    }

    const fetchGenres = async () => {
        const genres = await getGenres();
        setGenresArray(genres);
    }

    const sendNewBookToServer = async () => {
        const result = await addNewBook({genre, author, name: bookName, description, edition, imageURL, pages: +pages, price: +price, id: 0});
        setServerAnswer(result);
    }

    return (
        <>
            <h2>Добавление книги</h2>
            <br/>
            <br/>
            <div className={'add-book-container'}>
                <div className={'add-book-element'}>
                    <CustomLabel name={'Название книги'} value={bookName} onChange={(e) => setBookName(e.target.value)}
                                 placeholder={"Как устроиться программистом, студенту из ИНМИТА"}/>
                </div>
                <div className={'add-book-element'}>
                    <h3>Автор</h3>
                    <input list="author" type="text" value={author} className={'data-list'}
                           onChange={(e) => setAuthor(e.target.value)}/>
                    {authorsArray.length ?
                        <datalist id={"author"}>
                            {renderItems(authorsArray)}
                        </datalist> :
                        <p>Подгружаем...</p>
                    }
                </div>
                <div className={'add-book-element'}>
                    <CustomLabel name={'Краткое описание'} value={description}
                                 onChange={(e) => setDescription(e.target.value)}
                                 placeholder={"Просто люби своё дело, следуй принципам и целям"}/>
                </div>
                <div className={'add-book-element'}>
                    <h3>Издание</h3>
                    <input list="editions" type="text" value={edition} className={'data-list'}
                           onChange={(e) => setEdition(e.target.value)}/>
                    {editionsArray.length ?
                        <datalist id={"editions"}>
                            {renderItems(editionsArray)}
                        </datalist> :
                        <p>Подгружаем...</p>
                    }
                </div>
                <div className={'add-book-element'}>
                    <CustomLabel name={'Ссылка на картинку'} value={imageURL}
                                 onChange={(e) => setImageURL(e.target.value)} placeholder={""}/>
                </div>
                <div className={'add-book-element'}>
                    <h3>Жанр</h3>
                    <input list="genres" type="text" value={genre} className={'data-list'}
                           onChange={(e) => setGenre(e.target.value)}/>
                    {genresArray.length ?
                        <datalist id={"genres"}>
                            {renderItems(genresArray)}
                        </datalist> :
                        <p>Подгружаем...</p>
                    }
                </div>
                <div className={'add-book-element'}>
                    <CustomLabel name={'Цена, ₽'} value={price} onChange={priceChange}/>
                    {validPrice ? <p className={'message-warning'}>Только числовые значения</p> : null}
                </div>
                <div className={'add-book-element'}>
                    <CustomLabel name={'Колличество страниц'} value={pages} onChange={pagesChange}/>
                    {validPages ? <p className={'message-warning'}>Только целые числовые значения</p> : null}
                </div>
            </div>
            {serverAnswer ?
                <p className={serverAnswer.includes('уже') ? "message-warning" : "message-success"}>{serverAnswer}</p> : null}
            <button className={'submit-button'} onClick={sendNewBookToServer}>Добавить книгу в ассортимент</button>

        </>
    );
};
