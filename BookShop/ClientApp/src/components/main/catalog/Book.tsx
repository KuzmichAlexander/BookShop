import React from "react";
import {useActions} from "../../../hooks/useActions";
import {useDispatch} from "react-redux";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {addBookToBasket} from "../../../redux/action-creators/books/books";
import {fetchedBookType} from "../../../redux/types/book/book";
import {log} from "util";


export const Book: React.FC<fetchedBookType> = ({id, hasInStorage, pages, name, author, description, edition, genre, imageURL, price}) => {
    const dispatch = useDispatch();

    const orderToBasket = () => {
        if(id === null || id === undefined) return;
        dispatch(addBookToBasket({count: 1, name, image: imageURL, bookId: id, price}));
    }

    return (
        <div className={'book'}>
            <div className={'image-container'}>
                <img src={imageURL} alt="Фотокарточка"/>
            </div>
            <div className={'book-info'}>
                <h3>{name}</h3>
                <p>genre</p>
                <p className={'book-price'}>{price}</p>
            </div>
            <div className={'more-info'}>
                <div className={'image-container'}>
                    <img src={imageURL} alt="Фотокарточка"/>
                </div>
                <div className={'book-info'}>
                    <h3>{name}</h3>
                    <div className={'description'}><h4>Автор:</h4><p>{arrayParamsParse(author)}</p></div>
                    <div className={'description'}><h4>Жанр:</h4><p>genre</p></div>
                    <div className={'description'}><h4>Издание:</h4><p>{edition}</p></div>
                    <div className={'description'}><h4>Кол-во страниц:</h4><p>{pages}</p></div>
                    <div className={'description'}><h4>Описание:</h4><p>{description}</p></div>
                    <div className={'price-description-more'}>
                        <p className={'book-price'}>{price}</p>

                        <button disabled={!hasInStorage} onClick={orderToBasket} className={'submit-button m0'}>В корзину</button>
                    </div>
                    <h5 style={{color:'#777777'}}>{hasInStorage ? 'На складе' : 'Нет в наличии'}</h5>
                </div>
            </div>

        </div>
    )
}

const arrayParamsParse = (items: string[] = ['пока пусто, позже будет']) :string => {
    let str: string = ' ';
    console.log(items)
    items.forEach(item => {
        str += item + ' / '
    });
    str = str.slice(0, str.length - 2);
    return str;
}
