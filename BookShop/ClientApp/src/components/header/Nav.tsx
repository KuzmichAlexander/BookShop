import {Link} from 'react-router-dom';
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {useState} from "react";
import {UserShortInfo} from "../main/modals/UserShortInfo";

export const Nav: React.FC = () => {
    const userName = useTypeSelector(state => state.authUser.name);
    const [userShortInfo, setUserShortInfo] = useState<boolean>(false);

    const showUserWindow = () => {
        setUserShortInfo(!userShortInfo);
        console.log('show');
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
                        <Link onClick={showUserWindow} to={'/auth'}>{userName}</Link>
                        {userShortInfo ? <UserShortInfo /> : null}
                    </div>
                    : <div className={'user-actions'}>
                    <Link to={'/auth'}>Войти</Link>
                    <Link to={'/registration'}>Зарегистрироваться</Link>
                </div>}

            </div>
        </header>
    );
};
