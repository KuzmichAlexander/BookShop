import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {CustomLabel} from "../../units/CustomLabel";
import {addAuthors, addCity, addEdition, addGenre} from "../../../DAL/api";

export const EditBooks = () => {
    //const isAdmin = useTypeSelector(state => state.authUser.isAdmin);
    //if(!isAdmin) return <Redirect to={'/catalog'} />
    const [cityName, setCityName] = useState<string>('');
    const [authorName, setAuthorName] = useState<string>('');
    const [edition, setEdition] = useState<string>('');
    const [genre, setGenre] = useState<string>('');

    const [citySuccess, setCitySuccess] = useState<string>('');
    const [authorSuccess, setAuthorSuccess] = useState<string>('');
    const [editionSuccess, setEditionSuccess] = useState<string>('');
    const [genreSuccess, setGenreSuccess] = useState<string>('');

    const addNewAuthor = async () => {
        const authorResult = await addAuthors(authorName);
        setAuthorSuccess(authorResult);
    }

    const addNewCity = async () => {
        console.log(cityName)
        const cityNameResult = await addCity(cityName);
        setCitySuccess(cityNameResult);
    }

    const addNewEdition = async () => {
        const editionResult = await addEdition(edition);
        setEditionSuccess(editionResult);
    }

    const addNewGenre = async () => {
        const genreResult = await addGenre(genre);
        setGenreSuccess(genreResult);
    }

    return (
        <div>
            <h2>Редактирования всякие разные (книжные конечно же)</h2>
            <div className={'add-elements-container'}>
                <div className={'add-element'}>
                    <CustomLabel onChange={(e) => setCityName(e.target.value)} value={cityName} type={'text'} name={'Добавить годод для доставки'} placeholder={'Екатеринбург'} />
                    {citySuccess ? <p className={citySuccess.includes('уже') ? "message-warning" : "message-success"}>{citySuccess}</p> : null}
                    <button onClick={addNewCity} className={'submit-button'}>Добавить город в базу</button>
                </div>
                <div className={'add-element'}>
                    <CustomLabel onChange={(e) => setEdition(e.target.value)} value={edition} type={'text'} name={'Добавить издание'} placeholder={'Альпина Паблишер'} />
                    {editionSuccess ? <p className={editionSuccess.includes('уже') ? "message-warning" : "message-success"}>{editionSuccess}</p> : null}
                    <button onClick={addNewEdition} className={'submit-button'}>Добавить издание в базу</button>
                </div>
                <div className={'add-element'}>
                    <CustomLabel onChange={(e) => setAuthorName(e.target.value)} value={authorName} type={'text'} name={'Добавить автора'} placeholder={'Лев Николаевич Толстой'} />
                    {authorSuccess ? <p className={authorSuccess.includes('уже') ? "message-warning" : "message-success"}>{authorSuccess}</p> : null}
                    <button onClick={addNewAuthor} className={'submit-button'}>Добавить автора в базу</button>
                </div>
                <div className={'add-element'}>
                    <CustomLabel onChange={(e) => setGenre(e.target.value)} value={genre} type={'text'} name={'Добавить жанр'} placeholder={'Романтичные птички'} />
                    {genreSuccess ? <p className={genreSuccess.includes('уже') ? "message-warning" : "message-success"}>{genreSuccess}</p> : null}
                    <button onClick={addNewGenre} className={'submit-button'}>Добавить жанр в базу</button>
                </div>

            </div>

        </div>
    );
};
