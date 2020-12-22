import {DuplicateModel} from "../models/dedupe.model";
import React, {CSSProperties} from "react";
import {Table, TableBody, TableCell, TableRow, withStyles} from "@material-ui/core";

// export const columnWidths = [20, 45, 20, 15];


const styles = {
    root:{
    } as CSSProperties,
    col0:{width:'20%'},
    col1:{width:'45%'},
    col2:{width:'20%'},
    col3:{width:'15%'}
    // col0:null, col1:null, col2:null, col3:null
}

// columnWidths.forEach((v,i)=>{
//     styles[`col${i}`] = {width: `${v}%`};
// });

export const ColWidths = ()=> <React.Fragment>
    <col span={1} style={styles.col0}/>
    <col span={1} style={styles.col1}/>
    <col span={1} style={styles.col2}/>
    <col span={1} style={styles.col3}/>
</React.Fragment>

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

function _DuplicateList({duplicates}:{duplicates:DuplicateModel[]}){
    return <Table size="small" style={styles.root}>
        <ColWidths/>
        <TableBody>
            {duplicates.map((duplicate:DuplicateModel)=><Value duplicate={duplicate} key={duplicate.mechanismNumber}/>)}
        </TableBody>
    </Table>
}

export const DuplicateList = React.memo(_DuplicateList);