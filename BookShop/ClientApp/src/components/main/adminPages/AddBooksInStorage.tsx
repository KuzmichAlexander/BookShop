import React, {useEffect, useState} from 'react';
import {renderItems} from "../../../utils/OrderElement";
import {AddBookIntoStorage, getBooksName} from "../../../DAL/api";
import {MultiOptions} from "../../../utils/consts/MultiOptions";
import {CustomLabel} from "../../../utils/CustomLabel";

type bkType = {
    visible: boolean;
}

export const AddBooksInStorage:React.FC<bkType> = ({visible}) => {
    const [namesArray, setNames] = useState<string[]>([]);
    const [name, setName] = useState<string[]>([]);
    const [count, setCount] = useState<string>('0');
    const [validValue, setValidValue] = useState<boolean>(false);

    const [serverAnswer, setServerAnswer] = useState('');

    useEffect(() => {
        getBooks();
    }, [])

    const getBooks = async () => {
        const response = await getBooksName();
        setNames(response);
    }

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!name.includes(value) && namesArray.includes(value) && name.length === 0) {
            setName([value]);
        }
    }

    const removeName = (item: string) => {
        setName([]);
    }

    const countChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValidValue(false);
        let value = e.target.value;

        if (!isNaN(+value) && +value >= 0) {
            setCount(value);
            return;
        }
        setValidValue(true);
    }

    const addBooks = async () => {
        const serverAnswer = await AddBookIntoStorage({name: name[0], count: parseInt(count)});
        setServerAnswer(serverAnswer);
    }


    return (
        <div className={visible ? 'm-top-bottom-20' : 'm-top-bottom-20 hide-container'}>
            <div className={'add-book-container'}>
                <MultiOptions items={namesArray} title={'Выбирите книгу по названию'} bookParams={name}
                              removeItem={removeName} onChange={onChangeName}/>
                <div className={'add-book-element'}>
                    <CustomLabel onChange={countChange} value={count} name={'Колличество книг'}/>
                    {validValue ? <p className={'message-warning'}>Только целые числовые значения</p> : null}
                </div>
                <button onClick={addBooks} className={'submit-button mr10'}>Добавить книг на склад</button>
                <button onClick={() => getBooks()} className={'submit-button'}>Обновить список книг</button>
                {serverAnswer ?
                    <p className={serverAnswer.includes('уже') ? "message-warning" : "message-success"}>{serverAnswer}</p> : null}
            </div>
        </div>
    );
};
