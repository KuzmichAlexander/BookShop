import {CustomLabel} from "../../../utils/CustomLabel";
import React, {useEffect, useState} from "react";
import {addNewBook, addParamsToNewBook, getAuthors, getEditions, getGenres} from "../../../DAL/api";
import {renderItems} from "../../../utils/OrderElement";
import {MultiOptions} from "../../../utils/consts/MultiOptions";
import img from "../../../images/addBookNoImage/defaultImage.jpg";
import {DragNDrop} from "./DragNDrop";

type bkType = {
    visible: boolean;
}

const imageURL = img;

export const AddBookComponent: React.FC<bkType> = ({visible}) => {
    const [bookName, setBookName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [price, setPrice] = useState<string>('0');
    const [validPrice, setValidPrice] = useState<boolean>(false);

    const [pages, setPages] = useState<string>('0');
    const [validPages, setValidPages] = useState<boolean>(false);

    const [edition, setEdition] = useState<string[]>([]);
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
            edition: edition[0],
            imageURL: imageSrc,
            pages: +pages,
            price: +price,
            id: 0,
            imageFile,
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

    const onChangeEdition = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!edition.includes(value) && editionsArray.includes(value)) {
            setEdition([value]);
        }
    }

    const removeEdition = (item: string) => {
        const filtredList = edition.filter(elem => elem !== item);
        setEdition(filtredList);
    }

    const handleFile = () => {
        // @ts-ignore
        document.querySelector('#upload-node').click();
    }


    const [imageFile, setImageFile] = useState<File>();
    const [imageSrc, setImageSrc] = useState<string>('');

    const setImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = ev => {
                setImageFile(imageFile);
                if (ev.target) { // @ts-ignore
                    setImageSrc(ev.target.result);
                }
            }
            reader.readAsDataURL(imageFile)
        }
        setImageSrc('');
    }

    const handleDropZone = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        const imageFile = e.dataTransfer.files[0];
        if (imageFile && e.dataTransfer.files.length === 1) {
            const reader = new FileReader();
            reader.onload = ev => {
                if (ev.target) { // @ts-ignore
                    setImageSrc(ev.target.result);
                }
            }
            reader.readAsDataURL(imageFile)
        }
    }

    const deleteFile = () => {
        setImageSrc('');
    }


    return (
        <>
            <div className={visible ? 'm-top-bottom-20' : 'm-top-bottom-20 hide-container'}>
                <div className={'add-book-container'}>
                    <div className={'add-book-element'}>
                        <CustomLabel name={'Название книги'} value={bookName}
                                     onChange={(e) => setBookName(e.target.value)}
                                     placeholder={"Как устроиться программистом, студенту из ИНМИТА"}/>
                    </div>
                    <div className={'add-book-element'}>
                        <CustomLabel name={'Краткое описание'} value={description}
                                     onChange={(e) => setDescription(e.target.value)}
                                     placeholder={"Просто люби своё дело, следуй принципам и целям"}/>
                    </div>
                    <MultiOptions items={editionsArray} title={'Издание'} bookParams={edition}
                                  removeItem={removeEdition} onChange={onChangeEdition}/>
                    <div className={'add-book-element'}>
                        <CustomLabel name={'Цена, ₽'} value={price} onChange={priceChange}/>
                        {validPrice ? <p className={'message-warning'}>Только числовые значения</p> : null}
                    </div>
                    <div className={'add-book-element'}>
                        <CustomLabel name={'Колличество страниц'} value={pages} onChange={pagesChange}/>
                        {validPages ? <p className={'message-warning'}>Только целые числовые значения</p> : null}
                    </div>

                    <MultiOptions items={genresArray} title={'Жанр (-ы)'} bookParams={genre} removeItem={removeGenre}
                                  onChange={onChangeGenre}/>

                    <div className={'add-book-element'}>
                        <div style={{margin: '0 auto', width:'252px'}} >
                            <img src={imageSrc || imageURL} alt=""/>
                        </div>
                        <input id={'upload-node'} type="file" accept={'image/*'} onChange={setImage}/>
                        {imageSrc ? null : <DragNDrop handleDropZone={handleDropZone}/>}
                        <div style={{transform:'translateY(-20px)'}}>
                            {imageSrc ? null : <button style={{marginRight: 20}} className={'submit-button'} onClick={handleFile}>Выбрать файл</button>}
                            {!imageSrc ? null : <button className={'submit-button'} onClick={() => setImageSrc('')}>Отчистить</button>}

                        </div>
                    </div>
                    <MultiOptions items={authorsArray} title={'Автор (-ы)'} bookParams={author}
                                  removeItem={removeAuthor} onChange={onChangeAuthor}/>
                </div>

                <div>{serverAnswer ?
                    <p className={serverAnswer.includes('уже') ? "message-warning" : "message-success"}>{serverAnswer}</p> : null}
                    {fullServerAnswer ?
                        <p className={serverAnswer.includes('уже') ? "message-warning" : "message-success"}>{fullServerAnswer}</p> : null}
                    <button className={'submit-button'} onClick={sendNewBookToServer}>Добавить книгу в ассортимент
                    </button>
                </div>

            </div>
        </>

    );
};
