import React, {useState} from 'react';
import {changePassword} from "../../../DAL/api";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {CustomLabel} from "../../units/CustomLabel";

export const AccountInfo = () => {
    const user = useTypeSelector(state => state.authUser);
    const [changeFlag, setChangeFlag] = useState<boolean>(false);
    const [oldPass, setOldPass] = useState<string>('');
    const [newPass, setNewPass] = useState<string>('');

    const [serverAnswer, setServerAnswer] = useState<string>('');

    const changePassHandler = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const answer = await changePassword({oldPass, newPass}, token);
            setServerAnswer(answer)
        }
    }

    // changePassword
    return (
        <>
            {user ?
                <div>
                    <h3 style={{textDecoration: 'underline'}}>Информация о аккаунте:</h3>
                    <div className="user-description">
                        <span>Имя</span>
                        <p>{user.name}</p>
                    </div>
                    <div className="user-description">
                        <span>Фамилия</span>
                        <p>{user.surname}</p>
                    </div>
                    <div className="user-description">
                        <span>Эл. Почта</span>
                        <p>{user.email}</p>
                    </div>
                    <div className="user-description">
                        <span>Статус</span>
                        <p>{user.isAdmin ? 'Администратор' : 'Пользователь'}</p>
                    </div>
                    <button className={'submit-button'} onClick={() => setChangeFlag(!changeFlag)}>Изменить пароль</button>
                    {changeFlag
                        ? <div style={{width: 400, marginTop: 15, border: '2px solid #999', padding: 15}}>
                            <CustomLabel name={'Старый пароль'} type={'password'} value={oldPass}
                                         onChange={(e) => setOldPass(e.target.value)}/>
                            <CustomLabel name={'Новый пароль'} type={'password'} value={newPass}
                                         onChange={(e) => setNewPass(e.target.value)}/>
                            {serverAnswer ?
                                <p className={serverAnswer.includes('Неверно') ? "message-warning" : "message-success"}>{serverAnswer}</p> : null}
                            <button className={'submit-button'} onClick={changePassHandler}>Изменить</button>

                        </div>
                        : null}
                </div>
                : null
            }
        </>

    );
}
