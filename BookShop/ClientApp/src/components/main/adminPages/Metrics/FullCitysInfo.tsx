import React from 'react';
import {cityType} from "./Metrics";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {makeStyles} from "@material-ui/core";

type FIType = {
    visible: boolean;
    data: cityType[];
}

const resultRows = ['Место', 'Город', 'Проданных книг'];

const useStyles = makeStyles({
    table: {
        minWidth: 410,
    },
});

export const FullCitiesInfo:React.FC<FIType> = ({visible, data}) => {
    const classes = useStyles();
    console.log(data);
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
                        {data.map((city, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row" width={'7%'}>
                                    {city.place}
                                </TableCell>
                                <TableCell width={'10%'} align="center">{city.value}</TableCell>
                                <TableCell align="center">{city.count}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
