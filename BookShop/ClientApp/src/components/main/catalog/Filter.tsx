import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {CustomLabel} from "../../units/CustomLabel";


type filter = {
    name: string
    setName: Dispatch<SetStateAction<string>>;
}

export const Filter: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [priceAbove, setPriceAbove] = useState<string>('');
    const [priceBellow, setPriceBellow] = useState<string>('');

    const nameChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
    }



    return (
        <div className={'filter-container'}>
            <form >
                <h2>Параметры</h2>
                <br/>
                <CustomLabel placeholder={'Я ищу...'} name={''} value={name} type={'text'} onChange={nameChange} />

                <h2>Цена</h2>
                <div className={'price-container'}>
                    <input className={'price-filter'} placeholder={'От'} value={priceAbove} onChange={(e) => setPriceAbove(e.target.value)} type="text"/>
                    <input className={'price-filter'} placeholder={'До'} value={priceBellow} onChange={(e) => setPriceBellow(e.target.value)} type="text"/>
                </div>

                <h2>Категория</h2>
                <select>
                    <option value="Роман">Роман</option>
                    <option value="Приключения">Приключения</option>
                    <option value="Ужасы">Ужасы</option>
                </select>
            </form>

        </div>
    )
}


