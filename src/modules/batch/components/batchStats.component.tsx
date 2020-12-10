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

function getSelection(batchStats:BatchStatsModel):string{
    let all = batchStats.allCount;
    let selected = batchStats.selectedCount;
    if (all==selected) return `All (${all}) dedupes`;
    if (selected===0) return `No dedupes`;
    return `${selected} out of ${all} dedupes`
}

function getCounts(batchStats:BatchStatsModel, type: 'readyToResolve'|'alreadyResolved'):string{
    let methods = batchStats[type];
    let output = Object.keys(methods).map(method=>{
        let count = methods[method];
        if (count===0) return null;
        return `${count===batchStats.allCount?`All (${count})`:count} ${method}`;
    });
    return output.filter(o=>o).join(', ');
}

export default function BatchStats({batchStats}:{batchStats:BatchStatsModel}) {
    let readyTotal = batchStats.readyToResolve.custom+batchStats.readyToResolve.sum+batchStats.readyToResolve.maximum;
    let alreadyTotal = batchStats.alreadyResolved.custom+batchStats.alreadyResolved.sum+batchStats.alreadyResolved.maximum;
    return <React.Fragment>
        <Typography style={styles.heading}>Selected</Typography>
        <Typography style={styles.info} data-testid='batch_stats_selected'>{getSelection(batchStats)}</Typography>

        {readyTotal>0&&<React.Fragment>
                <Typography style={styles.heading}>Method (Ready to resolve)</Typography>
                <Typography style={styles.info} data-testid='batch_stats_ready'>{getCounts(batchStats, 'readyToResolve')}</Typography>
        </React.Fragment>}
        {alreadyTotal>0&&<React.Fragment>
                <Typography style={styles.heading}>Method (Already resolved)</Typography>
                <Typography style={styles.info} data-testid='batch_stats_already'>{getCounts(batchStats, 'alreadyResolved')}</Typography>
        </React.Fragment>}
        {batchStats.unresolved>0&&<React.Fragment>
                <Typography style={styles.heading}>Unresolved</Typography>
                <Typography style={styles.info} data-testid='batch_stats_unresolved'>{batchStats.unresolved} dedupes</Typography>
        </React.Fragment>}
    </React.Fragment>;
}