import {Dispatch, SetStateAction} from "react";

type filter = {
    name: string
    setName: Dispatch<SetStateAction<string>>;
}

export const Filter: React.FC<filter> = ({setName, name}) => {


    return (
        <div>

        </div>
    )
}


