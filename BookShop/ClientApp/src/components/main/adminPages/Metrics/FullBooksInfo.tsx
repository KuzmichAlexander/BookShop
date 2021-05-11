import React from 'react';
import {bookType} from "./Metrics";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/core";
import {arrayParamsParse} from "../../../../utils/consts/consts";

type FIType = {
    visible: boolean;
    data: bookType[];
}

const resultRows = ['Место', 'Описание', 'Цена за штуку', 'Продано экземпляров', 'Общаяя выручка'];

const useStyles = makeStyles({
    table: {
        minWidth: 410,
    },
});

export const FullBooksInfo: React.FC<FIType> = ({visible, data}) => {
    const classes = useStyles();

    return (
        <div className={visible ? 'm-top-bottom-20' : 'm-top-bottom-20 hide-container'}>
            <TableContainer component={Paper}>
                <Table className={classes.table} size={'small'} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {
                                resultRows.map((item, index) =>
                                    <TableCell key={index} align={index === 0 ? "left" : 'center'}>{item}</TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((book, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row" width={'7%'}>
                                    {book.place}
                                </TableCell>
                                <TableCell width={'63%'} align="center">
                                    <div className={'order-title'}>
                                        <div className={'order-image'}>
                                            <img src={book.imageURL} alt="книжка"/>
                                        </div>
                                        <div>
                                            <h3 style={{textAlign:'left'}}>{book.name}</h3>
                                            <p style={{opacity: .7}}>{book.edition} / {arrayParamsParse([...book.authors, ...book.genres])}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell width={'10%'} align="center">{book.price}</TableCell>
                                <TableCell align="center">{book.count}</TableCell>
                                <TableCell align="center">{book.count * book.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
