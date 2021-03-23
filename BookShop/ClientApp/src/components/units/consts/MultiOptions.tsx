import React, {useState} from "react";
import {renderItems} from "../OrderElement";

type multiOptionsType = {
    title: string;
    items: string[];
    bookParams: string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeItem: (item: string) => void;
}

export const MultiOptions: React.FC<multiOptionsType> = ({title, items, bookParams,onChange, removeItem}) => {
    const [value, setValue] = useState<string>('');

    return (
        <div className={'add-book-element'}>
            <h3>{title}</h3>
            <input list={title} type="text" className={'data-list'}
                   onChange={
                       (e) => {onChange(e)
                        setValue(e.target.value)
                       }
                   } value={value}  onClick={() => setValue('')}/>
            {items.length ?
                <datalist id={title}>
                    {renderItems(items)}
                </datalist> :
                <p>Подгружаем...</p>
            }
            <div className={'selected-items'}>
                {bookParams.map(item => <ItemInBookDescriptionList key={item} removeItem={removeItem} name={item}/>)}
            </div>
        </div>
    )
}

type ItemInBookDescriptionListType = {
    name: string;
    removeItem: (item: string) => void;
}

export const ItemInBookDescriptionList: React.FC<ItemInBookDescriptionListType> = ({name, removeItem}) => {
    return (
        <div className={'selected-item'}>
            <p className={'selected-item-name'}>{name}</p>
            <div className={'remove-item'} onClick={() => removeItem(name)}>X</div>
        </div>
    )
}
