import React, {useState} from 'react';
import {CustomLabel} from "../../units/CustomLabel";
import {Loader} from "../../units/Loader";
import {payFetchOperation} from "../../../DAL/api";

type payModalType = {
    changeModal: () => void;
    fetchOrder: () => void;
    city: string;
}

export const PayModal: React.FC<payModalType> = ({changeModal, city, fetchOrder}) => {
    const [cardNum, setCardNum] = useState<string>('');
    const [cardDate, setCardDate] = useState<string>('');

    const [serverReq, setServerReq] = useState<boolean>(false);

    const [serverResponse, setServerResponce] = useState<string>('');

    const payOperation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setServerReq(true);
        const response = await payFetchOperation();
        setServerResponce(response);
        setServerReq(false);
        setTimeout(() => {
            changeModal();
            fetchOrder();
        }, 700);
    }

    const payDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        let symbol = value.slice(value.length - 1, value.length)

        if (!isNaN(+symbol) || symbol === ' ') {
            if (value.length === 2) value += '/';
            setCardDate(value);
            return;
        }
    }

    const payDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        let symbol = value.slice(value.length - 1, value.length)
        console.log(symbol, 'ss', value)

        if (!isNaN(+symbol)) {
            if (value.length === 4) value += ' ';
            if (value.length === 9) value += ' ';
            if (value.length === 14) value += ' ';
            setCardNum(value);
            return;
        }
    }

    return (
        <div onClick={changeModal} className={'modalWrapper basket-focus'}>
            <div onClick={event => event.stopPropagation()} className={'pay-modal-container'}>
                <form onSubmit={payOperation} action="">
                    <h3>Данные банковской карты</h3>
                    <label className={'pay-modal-label'}><p>Номер карты</p><input
                        onClick={() => setCardNum('')}
                        placeholder={'0000-0000-0000-0000'}
                        className={'card-number'}
                        value={cardNum}
                        onChange={payDataChange} type="text"/></label>
                    <label className={'pay-modal-label'}><p>Дата окончания&nbsp;</p>

                        <input className={'card-number card-date'}
                               onClick={() => setCardDate('')}
                               placeholder={'MM/YY'}
                               value={cardDate}
                               onChange={payDateChange}
                               type="text"/>
                    </label>

                    <label className={'pay-modal-label'}><p>Город доставки:&nbsp;</p><u>{city}</u></label>
                    <button type={'submit'} className={'submit-button'}>Оплатить</button>
                </form>
                <br/>
                {serverReq ?
                    <>
                        <p className={'message-neutral'}>Ожидание проведения транзакции...</p>
                        <Loader width={100} color={"green"}/>
                    </> : null}
                <Loader width={0} color={"green"}/>
                {serverResponse ? <p className={'message-success'}>{serverResponse}</p> : null}
            </div>
        </div>
    );
};
