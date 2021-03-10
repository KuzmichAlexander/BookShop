import {ChangeEvent, useState} from "react";
import {CustomLabel} from "../../units/CustomLabel";



export const Register = () => {
    const [name, setName] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [accept, setAccept] = useState<boolean>(true);

    const registrationUser = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Сконектить с сервером!!!!!
    }

    const nameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const surnameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSurname(e.target.value);
    }

    const loginChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
    }

    const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const emailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const acceptChange = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
        setAccept(!accept);
    }

    return (
        <div className={'auth-container'}>
            <form onSubmit={registrationUser}>
                <h1>Регистрация</h1>
                <br/>
                <CustomLabel name={'Имя'} type={'text'} value={name} onChange={nameChange} />
                <CustomLabel name={'Фамилия'} type={'text'} value={surname} onChange={surnameChange} />
                <CustomLabel name={'Email'} type={'text'} value={email} onChange={emailChange} />
                <CustomLabel name={'Логин'} type={'text'} value={login} onChange={loginChange} />
                <CustomLabel name={'Пароль'} type={'text'} value={password} onChange={passwordChange} />

                <label className={'input__container'}>
                    <input type="checkbox" className="custom-checkbox" id="happy" name="happy" value="yes" />
                    <label onClick={acceptChange} className={'custom-checkbox-label'} htmlFor="happy">Обязуюсь подарить автору печеньки</label>
                </label>
                <button disabled={accept} className={'submit-button'} type={"submit"}>Зарегистрироваться</button>
            </form>
        </div>
    );
};
