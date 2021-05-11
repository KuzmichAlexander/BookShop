import whiteLoader from '../images/loader/Spinner-white.svg';
import greenLoader from '../images/loader/Spinner-green.svg';

type options = {
    width: number;
    color: "green" | "white";
    marginTop?: number;
    scale?: number;
}

export const Loader: React.FC<options> = ({width, color, marginTop= 0, scale= 1}) => {
    return (
        <div style={{margin: "0 auto", width:`${width}px`, zIndex:100, display:"inline-block", transform:`translateY(${marginTop}px) scale(${scale})`, }}>
            <img width={width} height={width} src={color === "green" ? greenLoader : whiteLoader} alt=""/>
        </div>
    );
};
