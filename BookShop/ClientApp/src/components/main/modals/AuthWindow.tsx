import React, {ChangeEvent, useState} from 'react';
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {useActions} from "../../../hooks/useActions";
import {CustomLabel} from "../../../utils/CustomLabel";
import {Loader} from "../../../utils/Loader";

type AuthWindowType = {
    showAuthWindow: () => void;
}

export const AuthWindow: React.FC<AuthWindowType> = ({showAuthWindow}) => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [saveMe, setSaveMe] = useState<boolean>(false);

    const error = useTypeSelector(state => state.authUser.error);

    const {userAuth} = useActions();


    const changeLogin = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
    }

    const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const auth = () => {
        userAuth(login, password, saveMe);
    }

    const acceptChange = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
        setSaveMe(!saveMe);
    }

    return (
        <div onClick={showAuthWindow} className={'modalWrapper'}>
            <div onClick={event => event.stopPropagation()} className={'UserInfoWindow'}>
                <p>Авторизируйтесь</p>
                <br/>
                <CustomLabel onChange={changeLogin} value={login} type={'text'} name={'Login'}/>
                <CustomLabel onChange={changePassword} value={password} type={'password'} name={'Password'}/>
                <label className={'input__container'}>
                    <input type="checkbox" className="custom-checkbox" id="happy" name="happy" value="yes" />
                    <label onClick={acceptChange} className={'custom-checkbox-label'} htmlFor="happy">Запомнить меня</label>
                </label>
                {error ? <p className={'message-warning'} style={{fontSize: 18}}>{error} <br/><br/></p> : null}
                <button className={"submit-button auth-button"} onClick={auth}>Войти</button>
            </div>
        </div>
    );
};




