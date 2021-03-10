import {Link} from 'react-router-dom';
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {useState} from "react";
import {UserShortInfo} from "../main/modals/UserShortInfo";
import {AuthWindow} from "../main/modals/AuthWindow";
import {useActions} from "../../hooks/useActions";
import {userLoguot} from "../../redux/action-creators/userActionCreators/userAuthRegister";

export const Nav: React.FC = () => {
    const userName = useTypeSelector(state => state.authUser.name);
    const [userShortInfo, setUserShortInfo] = useState<boolean>(false);
    const [authWindow, setAuthWindow] = useState<boolean>(false);





    const showUserWindow = () => {
        setUserShortInfo(!userShortInfo);
        console.log('show user');
    }

    const showAuthWindow = () => {
        setAuthWindow(!authWindow);
        console.log('show auth');
    }

    return (
        <header >
            <div className={'container'}>
                <nav className={'header-navigation'}>
                    <div className={'logo'}></div>
                    <Link to={'/'}>Главная</Link>
                    <Link to={'/catalog'}>Каталог</Link>
                    <Link to={'/calc'}>Канкулятор анжуманий</Link>
                </nav>
                {userName ?
                    <div className={'user-actions'}>
                        <a onClick={showUserWindow} >{userName}</a>
                        {userShortInfo ? <UserShortInfo showWindow={showUserWindow} /> : null}
                    </div>
                    : <div className={'user-actions'}>
                    <a onClick={showAuthWindow} >Войти</a>
                        {authWindow ? <AuthWindow showAuthWindow={showAuthWindow}  /> : null}
                    <Link to={'/registration'}>Зарегистрироваться</Link>
                </div>}

            </div>
        </header>
    );
};
