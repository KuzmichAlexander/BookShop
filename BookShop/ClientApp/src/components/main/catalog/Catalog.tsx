import {useState} from "react";
import {Filter} from "./Filter";
import {BooksContainer} from "./BooksContainer";


export const Catalog: React.FC = () => {
    const [name, setName] = useState<string>('');


    return (
        <div className={'container'}>
            <div className={'books'}>
                <Filter />
                <BooksContainer />
            </div>

        </div>
    );
};
