import React, {ChangeEvent, useState} from 'react';
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {useActions} from "../../../hooks/useActions";
import {CustomLabel} from "../../units/CustomLabel";

type AuthWindowType = {
    showAuthWindow: () => void;
}

export const AuthWindow: React.FC<AuthWindowType> = ({showAuthWindow}) => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {userAuth} = useActions();


    const changeLogin = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
    }

    const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const auth = () => {
        userAuth(login, password);
    }

    return (
        <div onClick={showAuthWindow} className={'modalWrapper'}>
            <div onClick={event => event.stopPropagation()} className={'UserInfoWindow'}>
                <p>Авторизируйтесь</p>
                <br/>
                <CustomLabel onChange={changeLogin} value={login} type={'text'} name={'Login'}/>
                <CustomLabel onChange={changePassword} value={password} type={'password'} name={'Password'}/>
                <button className={"submit-button auth-button"} onClick={auth}>Войти</button>
            </div>
        </div>
    );
};




