import {DuplicateModel} from "../models/dedupe.model";
import React, {CSSProperties} from "react";
import {Table, TableBody, TableCell, TableRow, withStyles} from "@material-ui/core";

const styles = {
    root:{
    } as CSSProperties,
    column: {
        width: 110
    }
}

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
        <TableCell className='duplicateColumn' >{duplicate.agencyName}</TableCell>
        <TableCell className='duplicateColumn' >{duplicate.partnerName}</TableCell>
        <TableCell className='duplicateColumn' >{duplicate.mechanismNumber}</TableCell>
        <TableCell className='duplicateColumn' >{duplicate.value}</TableCell>
    </Row>
}

export function DuplicateList({duplicates}:{duplicates:DuplicateModel[]}){
    return <Table size="small" className='duplicatesListTable'style={styles.root}>
        <colgroup>
            <col span={1} style={styles.column}/>
            <col span={1} style={styles.column}/>
            <col span={1} style={styles.column}/>
        </colgroup>
        <TableBody>
            {duplicates.map((duplicate:DuplicateModel)=><Value duplicate={duplicate} key={duplicate.mechanismNumber}/>)}
        </TableBody>
    </Table>
}