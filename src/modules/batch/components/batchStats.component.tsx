import React from "react";
import {BatchStatsModel} from "../services/generateBatchStats.service";
import {Typography} from "@material-ui/core";

const styles = {
    root:{paddingTop:7},
    info:{
        fontSize:14,
        marginLeft: 5
    }
};

export default function BatchStats({batchStats}:{batchStats:BatchStatsModel}) {
    return <div style={styles.root} data-testid='batch_stats'>

        <Typography style={styles.info}>{batchStats.selectedCount} out of {batchStats.allCount} selected</Typography>
        {batchStats.selectedCount>0 && <React.Fragment>
            <Typography style={styles.info}>{batchStats.alreadyResolved} already resolved</Typography>
            <Typography style={styles.info}>{batchStats.readyToResolve} ready to resolve</Typography>
            <Typography style={styles.info}>{batchStats.readyToUnresolve} ready to unresolve</Typography>
            <Typography style={styles.info}>{batchStats.unresolved} unresolved</Typography>
        </React.Fragment>}
    </div>;
}