import React from "react";
import {BatchStatsModel} from "../services/generateBatchStats.service";
import {Typography} from "@material-ui/core";

const styles = {
    heading:{
        fontSize: 14,
        fontWeight: 500,
        marginTop: 6,
        marginLeft: 5
    },
    info:{
        fontSize:14,
        marginLeft: 10
    }
};

function getSelection(batchStats:BatchStatsModel){
    let all = batchStats.allCount;
    let selected = batchStats.selectedCount;
    if (all==selected) return `All (${all}) dedupes`;
    if (selected===0) return `No dedupes`;
    return `${selected} out of ${all} dedupes`
}

export default function BatchStats({batchStats}:{batchStats:BatchStatsModel}) {
    return <React.Fragment>
        <Typography style={styles.heading}>Selected</Typography>
        <Typography style={styles.info} data-testid='batch_selected'>{getSelection(batchStats)}</Typography>
    </React.Fragment>;
}