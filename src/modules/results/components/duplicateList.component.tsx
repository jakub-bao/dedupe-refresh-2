import {DuplicateModel} from "../models/dedupe.model";
import React from "react";
import {Table, TableBody, TableCell, TableRow, withStyles} from "@material-ui/core";

const Row = withStyles((theme) => ({
    root: {
        '& .MuiTableCell-root': {
            borderBottom: 0,
        },
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function Value({duplicate}:{duplicate:DuplicateModel}){
    return <Row>
        <TableCell>{duplicate.agencyName}</TableCell>
        <TableCell>{duplicate.partnerName}</TableCell>
        <TableCell>{duplicate.mechanismNumber}</TableCell>
        <TableCell>{duplicate.value}</TableCell>
    </Row>
}

export function DuplicateList({duplicates}:{duplicates:DuplicateModel[]}){
    return <Table size="small">
        <TableBody>
            {duplicates.map((duplicate:DuplicateModel)=><Value duplicate={duplicate} key={duplicate.mechanismNumber}/>)}
        </TableBody>
    </Table>
}