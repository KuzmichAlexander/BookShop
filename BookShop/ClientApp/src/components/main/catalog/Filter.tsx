import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {CustomLabel} from "../../units/CustomLabel";
import {createSelect} from "../../units/consts/consts";
import {useActions} from "../../../hooks/useActions";
import {getGenres} from "../../../DAL/api";
import {renderItems} from "../../units/OrderElement";

export const Filter: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [priceAbove, setPriceAbove] = useState<string>('');
    const [priceBelow, setPriceBelow] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const {fetchBooks} = useActions();

    const [genresArray, setGenresArray] = useState<string[]>([]);

    const nameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
    }

    useEffect(() => {
        fetchGenres();
    }, []);


    const filterChange = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchBooks({
            default: false,
            name,
            priceAbove: parseFloat(priceAbove),
            priceBelow: parseFloat(priceBelow),
            genre
        })
    }

    const fetchGenres = async () => {
        const genres = await getGenres();
        setGenresArray(genres);
    }


    return (
        <div className={'filter-container'}>
            <form onSubmit={filterChange}>
                <h2>Параметры</h2>
                <br/>
                <CustomLabel placeholder={'Я ищу...'} name={''} value={name} type={'text'} onChange={nameChange}/>

                <h2 style={{border: 'none'}}>Цена</h2>
                <div className={'price-container'}>
                    <input className={'price-filter'} placeholder={'От'} value={priceAbove}
                           onChange={(e) => setPriceAbove(e.target.value)} type="text"/>
                    <input className={'price-filter'} placeholder={'До'} value={priceBelow}
                           onChange={(e) => setPriceBelow(e.target.value)} type="text"/>
                </div>

                <h2 style={{border: 'none'}}>Категория</h2>
                {genresArray.length ?
                    <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                        {renderItems(genresArray)}
                    </select>
                    : <p>подгружаем...</p>
                }


                <button className={'custom-button submit-button'} type={'submit'}>Поиск</button>
            </form>

        </div>
    )
}


