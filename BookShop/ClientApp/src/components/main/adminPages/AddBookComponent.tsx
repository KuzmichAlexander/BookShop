import {CustomLabel} from "../../units/CustomLabel";
import React, {useEffect, useState} from "react";
import {addNewBook, addParamsToNewBook, getAuthors, getCities, getEditions, getGenres} from "../../../DAL/api";
import {renderItems} from "../../units/OrderElement";
import {log} from "util";
import {MultiOptions} from "../../units/consts/MultiOptions";


export const AddBookComponent = () => {
    const [bookName, setBookName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imageURL, setImageURL] = useState<string>('');

    const [price, setPrice] = useState<string>('0');
    const [validPrice, setValidPrice] = useState<boolean>(false);

    const [pages, setPages] = useState<string>('0');
    const [validPages, setValidPages] = useState<boolean>(false);

    const [edition, setEdition] = useState<string>('');
    const [editionsArray, setEditionsArray] = useState<string[]>([]);

    const [author, setAuthor] = useState<string[]>([]);
    const [authorsArray, setAuthorsArray] = useState<string[]>([]);

    const [genre, setGenre] = useState<string[]>([]);
    const [genresArray, setGenresArray] = useState<string[]>([]);

    const [serverAnswer, setServerAnswer] = useState('');
    const [fullServerAnswer, setFullServerAnswer] = useState('');

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
        setServerAnswer('');
        setFullServerAnswer('');
        const result = await addNewBook({
            name: bookName,
            description,
            edition,
            imageURL,
            pages: +pages,
            price: +price,
            id: 0
        });
        setServerAnswer(result);

        if (!result.includes('уже')) {
            await sendParamsForNewBook();
        }
    }

    const sendParamsForNewBook = async () => {
        const result = await addParamsToNewBook({author, genre, name: bookName});
        setFullServerAnswer(result);
    }

    const onChangeGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!genre.includes(value) && genresArray.includes(value)) {
            setGenre([...genre, value]);
        }
    }

    const removeGenre = (item: string) => {
        const filtredList = genre.filter(elem => elem !== item);
        setGenre(filtredList);
    }

    const onChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!author.includes(value) && authorsArray.includes(value)) {
            setAuthor([...author, value]);
        }
    }

    const removeAuthor = (item: string) => {
        const filtredList = author.filter(elem => elem !== item);
        setAuthor(filtredList);
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
                    <CustomLabel name={'Цена, ₽'} value={price} onChange={priceChange}/>
                    {validPrice ? <p className={'message-warning'}>Только числовые значения</p> : null}
                </div>
                <div className={'add-book-element'}>
                    <CustomLabel name={'Колличество страниц'} value={pages} onChange={pagesChange}/>
                    {validPages ? <p className={'message-warning'}>Только целые числовые значения</p> : null}
                </div>

                <MultiOptions items={genresArray} title={'Жанр (-ы)'} bookParams={genre} removeItem={removeGenre} onChange={onChangeGenre}/>
                <MultiOptions items={authorsArray} title={'Автор (-ы)'} bookParams={author} removeItem={removeAuthor} onChange={onChangeAuthor}/>
            </div>
            <div>{serverAnswer ?
                <p className={serverAnswer.includes('уже') ? "message-warning" : "message-success"}>{serverAnswer}</p> : null}
                {fullServerAnswer ? <p className={serverAnswer.includes('уже') ? "message-warning" : "message-success"}>{fullServerAnswer}</p> : null}
                <button className={'submit-button'} onClick={sendNewBookToServer}>Добавить книгу в ассортимент</button>
            </div>
        </>
    );
};
