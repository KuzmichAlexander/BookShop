import {ChangeEvent} from "react";

type customLabelType = {
    name: string;
    value: string;
    type?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string
}

export const CustomLabel: React.FC<customLabelType> = ({name,placeholder, onChange, type = 'text', value}) => {
    return (
        <label className={'input__container'}>
            <h3>{name}</h3>
            <input placeholder={placeholder} type={type} value={value} onChange={onChange}/>
        </label>
    )
}
