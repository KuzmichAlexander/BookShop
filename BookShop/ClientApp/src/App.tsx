import React, {useEffect} from 'react';
import {useTypeSelector} from "./hooks/useTypeSelector";
import {Nav} from "./components/header/Nav";
import {Main} from "./components/main/Main";
import {useActions} from "./hooks/useActions";
import {Footer} from "./components/footer/Footer";
import {token} from "./components/units/consts/consts";
import {useDispatch} from "react-redux";
import {getsBookFromBasket} from "./redux/action-creators/books/books";

function App() {
    const state = useTypeSelector(state => state);
    const { tokenUserAuth } = useActions();
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem(token)) {
            // @ts-ignore
            const accessToken: string = localStorage.getItem(token);
            tokenUserAuth(accessToken);
        }
        dispatch(getsBookFromBasket());
    }, []);


    //console.log(state)
    return (
        <>
            <Nav />
            <Main />
            <Footer />
        </>
    );
}

export default App;
