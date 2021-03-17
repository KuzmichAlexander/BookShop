import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {CustomLabel} from "../../units/CustomLabel";
import {createSelect} from "../../units/consts/consts";
import {useActions} from "../../../hooks/useActions";

export const Filter: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [priceAbove, setPriceAbove] = useState<string>('');
    const [priceBelow, setPriceBelow] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const {fetchBooks} = useActions();


    const nameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
    }


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


    return (
        <div className={'filter-container'}>
            <form onSubmit={filterChange}>
                <h2>Параметры</h2>
                <br/>
                <CustomLabel placeholder={'Я ищу...'} name={''} value={name} type={'text'} onChange={nameChange}/>

                <h2>Цена</h2>
                <div className={'price-container'}>
                    <input className={'price-filter'} placeholder={'От'} value={priceAbove}
                           onChange={(e) => setPriceAbove(e.target.value)} type="text"/>
                    <input className={'price-filter'} placeholder={'До'} value={priceBelow}
                           onChange={(e) => setPriceBelow(e.target.value)} type="text"/>
                </div>

                <h2>Категория</h2>
                <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                    {createSelect()}
                </select>

                <button className={'custom-button submit-button'} type={'submit'}>Поиск</button>
            </form>

        </div>
    )
}


