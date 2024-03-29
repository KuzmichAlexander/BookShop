import {useEffect} from "react";
import {Filter} from "./Filter";
import {BooksContainer} from "./BooksContainer";
import {useActions} from "../../../hooks/useActions";


export const Catalog = () => {
    document.title = "Каталог";
    const {fetchBooks} = useActions();

    useEffect(() => {
        fetchBooks({default: true});
    }, []);


    return (
        <div className={'container'}>
            <div className={'books'}>
                <Filter />
                <BooksContainer />
            </div>
        </div>
    );
};
