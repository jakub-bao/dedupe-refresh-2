import React, {CSSProperties} from "react";
import {DedupeModel, getDedupeStatus, InternalStatus} from "../../results/models/dedupe.model";
import {Typography} from "@material-ui/core";

const styles = {
    root: {
        textAlign: 'center',
        color: 'white'
    } as CSSProperties,
    status:{
        textTransform: 'uppercase',
        fontSize: 13,
    } as CSSProperties
};

function statusToText(status:InternalStatus):string{
    if (status===InternalStatus.localChanges) return 'UNSAVED';
    return status;
}

export default function StatusCell({dedupe}:{dedupe:DedupeModel}) {
    return <div style={styles.root}>
        <Typography style={styles.status}>{statusToText(getDedupeStatus(dedupe))}</Typography>
    </div>;
}