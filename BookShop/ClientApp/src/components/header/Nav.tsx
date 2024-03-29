import {Link} from 'react-router-dom';
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {useState} from "react";
import {UserShortInfo} from "../main/modals/UserShortInfo";
import {AuthWindow} from "../main/modals/AuthWindow";
import {Loader} from "../../utils/Loader";
import BasketImg from "../../images/shopping-basket.svg"
import {Basket} from "../main/modals/Basket";

export const Nav: React.FC = () => {
    const userName = useTypeSelector(state => state.authUser.name);
    const isAdmin = useTypeSelector(state => state.authUser.isAdmin);

    const loading = useTypeSelector(state => state.authUser.loading);
    const basketCount = useTypeSelector(state => state.booksBasket.orderList);
    const [userShortInfo, setUserShortInfo] = useState<boolean>(false);
    const [authWindow, setAuthWindow] = useState<boolean>(false);
    const [basket, setBasketWindow] = useState<boolean>(false);

    const showUserWindow = () => {
        setUserShortInfo(!userShortInfo);
    }

    const showAuthWindow = () => {
        setAuthWindow(!authWindow);
    }

    const showBasketWindow = () => {
        setBasketWindow(!basket);
    }

    const BooksInStorage = (): number => {
        let count = 0;
        basketCount.forEach(order => {
            count += order.count;
        })
        return count;
    }

    return (
        <header>
            <div className={'container'}>
                <nav className={'header-navigation'}>
                    <div className={'logo'}></div>
                    <Link to={'/'}>Главная</Link>
                    <Link to={'/catalog'}>Каталог</Link>
                </nav>
                {userName ?
                    <div className={'user-actions'}>
                        {isAdmin ? <>
                            <Link to={'editbooks'}>Настройки</Link>
                            <Link to={'metrics'}>Статистика</Link>
                        </> : null}
                        <a onClick={showUserWindow}>{userName}</a>
                        {basket ? <Basket showWindow={showBasketWindow}  /> : null}
                        <div onClick={showBasketWindow} className={'basket'}>
                            {BooksInStorage() ? <span>{BooksInStorage()}</span> : null}
                        </div>
                        {userShortInfo ? <UserShortInfo showWindow={showUserWindow}/> : null}
                    </div>
                    : <div className={'user-actions'}>
                        {loading ? <Loader scale={1.6} marginTop={4} width={30} color={"white"}/>
                            : <>
                                <a onClick={showAuthWindow}>Войти</a>
                                <Link to={'/registration'}>Зарегистрироваться</Link>
                            </>}
                        {basket ? <Basket showWindow={showBasketWindow}  /> : null}
                        <div onClick={showBasketWindow} className={'basket'}>
                            {BooksInStorage() ? <span>{BooksInStorage()}</span> : null}
                        </div>
                        {authWindow ? <AuthWindow showAuthWindow={showAuthWindow}/> : null}
                    </div>}
            </div>
        </header>
    );
}
