import React, {useEffect, useRef, useState} from 'react';
import arrow from '../../../images/addBookNoImage/drop-arrow.svg';

type dropZoneType = {
    handleDropZone: (e: any) => void;
}

export const DragNDrop: React.FC<dropZoneType> = ({handleDropZone}) => {
    const dropInput = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dropInput.current?.addEventListener('drop', handleDropZone)
        dropInput.current?.addEventListener('dragover', handleDrag)
        dropInput.current?.addEventListener('dragenter', handleDragIn)
        dropInput.current?.addEventListener('dragleave', handleDragOut)
    }, []);

    const [over, setOver] = useState<boolean>(false);


     const handleDragIn = (e: any) => {
        setOver(true);
    }

    const handleDragOut = (e: any) => {
        setOver(false);
    }


    const handleDrag = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
    };

    return (
        <div className={!over ? 'dropZone' : 'dropZone border-drop'} ref={dropInput}>
            <div className={'drop-arrow'}>
                <img src={arrow} alt="стрелочка"/>
            </div>
            <p>Перетащите сюда изображение :)</p>
        </div>
    );
}
