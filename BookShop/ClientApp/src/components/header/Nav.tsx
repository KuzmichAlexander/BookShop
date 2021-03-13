import {Link} from 'react-router-dom';
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {useState} from "react";
import {UserShortInfo} from "../main/modals/UserShortInfo";
import {AuthWindow} from "../main/modals/AuthWindow";
import {Loader} from "../units/Loader";

export const Nav: React.FC = () => {
    const userName = useTypeSelector(state => state.authUser.name);
    const isAdmin = useTypeSelector(state => state.authUser.isAdmin);

    const loading = useTypeSelector(state => state.authUser.loading);
    const [userShortInfo, setUserShortInfo] = useState<boolean>(false);
    const [authWindow, setAuthWindow] = useState<boolean>(false);

    const showUserWindow = () => {
        setUserShortInfo(!userShortInfo);
    }

    const showAuthWindow = () => {
        setAuthWindow(!authWindow);
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
                        {isAdmin ? <>
                            <Link to={'editbooks'}>Настройки</Link>
                            <Link to={'metrics'}>Статистика</Link>
                        </> : null}
                        <a onClick={showUserWindow} >{userName}</a>
                        {userShortInfo ? <UserShortInfo showWindow={showUserWindow} /> : null}
                    </div>
                    : <div className={'user-actions'}>
                        {loading ? <Loader scale={1.8} marginTop={9} width={30} color={"white"}/>
                        : <a onClick={showAuthWindow} >Войти</a>}
                        {authWindow ? <AuthWindow showAuthWindow={showAuthWindow}  /> : null}
                    <Link to={'/registration'}>Зарегистрироваться</Link>
                </div>}
            </div>
        </header>
    );
};
