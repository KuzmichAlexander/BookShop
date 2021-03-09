import {useState} from "react";
import {Filter} from "./Filter";


export const Catalog: React.FC = () => {
    const [name, setName] = useState<string>('');


    return (
        <div className={'container'}>
            <div className={'books-container'}>
                <div className={'filter'}>
                    <Filter name={name} setName={setName}/>
                </div>

                <div className={'books'}></div>
            </div>

        </div>
    );
};
