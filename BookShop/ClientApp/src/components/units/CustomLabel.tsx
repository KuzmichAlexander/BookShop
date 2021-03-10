import {ChangeEvent} from "react";

type customLabelType = {
    name: string;
    value: string;
    type: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CustomLabel: React.FC<customLabelType> = ({name, onChange, type, value}) => {
    return (
        <label className={'input__container'}>
            <h3>{name}</h3>
            <input type={type} value={value} onChange={onChange}/>
        </label>
    )
}
