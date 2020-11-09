import {DuplicateModel} from "../models/dedupe.model";
import React from "react";
import {Table, TableBody, TableCell, TableRow} from "@material-ui/core";

function Value({duplicate}:{duplicate:DuplicateModel}){
    return <TableRow>
        <TableCell>{duplicate.agencyName}</TableCell>
        <TableCell>{duplicate.partnerName}</TableCell>
        <TableCell>{duplicate.mechanismNumber}</TableCell>
        <TableCell>{duplicate.value}</TableCell>
    </TableRow>
}

export function DuplicateList({duplicates}:{duplicates:DuplicateModel[]}){
    return <Table>
        <TableBody>
            {duplicates.map((duplicate:DuplicateModel)=><Value duplicate={duplicate}/>)}
        </TableBody>
    </Table>
}