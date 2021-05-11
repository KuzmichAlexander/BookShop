import React, {useEffect} from 'react';
import {Nav} from "./components/header/Nav";
import {Main} from "./components/main/Main";
import {useActions} from "./hooks/useActions";
import {Footer} from "./components/footer/Footer";
import {token} from "./utils/consts/consts";
import {useDispatch} from "react-redux";
import {getsBookFromBasket} from "./redux/action-creators/books/books";

function App() {
    const { tokenUserAuth } = useActions();
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem(token) && localStorage.getItem('saveMe')) {
            const accessToken: string | null = localStorage.getItem(token);
            if (accessToken)  tokenUserAuth(accessToken);
        }
        dispatch(getsBookFromBasket());
    }, []);

    return (
        <>
            <Nav />
            <Main />
            <Footer />
        </>
    );
}

export default App;
