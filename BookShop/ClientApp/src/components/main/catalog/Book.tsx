import React from "react";
import {useActions} from "../../../hooks/useActions";
import {useDispatch} from "react-redux";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {addBookToBasket} from "../../../redux/action-creators/books/books";

type bookType = {
    author: string;
    description: string;
    edition: string;
    genre: string;
    imageURL: string;
    price: number;
    name: string;
    id: number | null | undefined;
}

export const Book: React.FC<bookType> = ({id, name, author, description, edition, genre, imageURL, price}) => {

    const dispatch = useDispatch();
    const isAdmin = useTypeSelector(state => state.booksBasket.orderList);
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
                <p>{author}</p>
                <p className={'book-price'}>{price}</p>
            </div>
            <div className={'more-info'}>
                <div className={'image-container'}>
                    <img src={imageURL} alt="Фотокарточка"/>
                </div>
                <div className={'book-info'}>
                    <h3>{name}</h3>
                    <div className={'description'}><h4>Автор:</h4><p>{author}</p></div>
                    <div className={'description'}><h4>Жанр:</h4><p>{genre}</p></div>
                    <div className={'description'}><h4>Описание:</h4><p>{description}</p></div>
                    <div className={'description'}>
                        <p className={'book-price'}>{price}</p>
                        <button onClick={orderToBasket} className={'submit-button bucket-button'}>В корзину</button>
                    </div>


                </div>
            </div>

        </div>
    )
}
