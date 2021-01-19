import {DuplicateModel} from "../models/dedupe.model";
import React, {CSSProperties} from "react";
import {Table, TableBody, TableCell, TableRow, withStyles} from "@material-ui/core";

const styles = {
    root:{
        height: '100%'
    } as CSSProperties,
    col0:{width:'15%'},
    col1:{width:'25%'},
    col2:{width:'45%'},
    col3:{width:'15%'}
}

export const ColWidths = ()=> <colgroup>
    <col span={1} style={styles.col0}/>
    <col span={1} style={styles.col1}/>
    <col span={1} style={styles.col2}/>
    <col span={1} style={styles.col3}/>
</colgroup>

const Row = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const Cell = withStyles(()=>({
    root:{
        borderBottom: 0,
        padding: 7,
        borderRight: `1px solid rgba(0,0,0,0.08)`,
        fontSize: 13,
        '&:last-child':{
            paddingRight: 5,
            borderRight: 0
        }
    }
}))(TableCell);

function Value({duplicate}:{duplicate:DuplicateModel}){
    return <Row>
        <Cell>{duplicate.mechanismNumber}</Cell>
        <Cell>{duplicate.agencyName}</Cell>
        <Cell>{duplicate.partnerName}</Cell>
        <Cell>{duplicate.value}</Cell>
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