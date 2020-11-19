import React, {CSSProperties} from "react";
import {DedupeModel, getDedupeStatus, InternalStatus} from "../../results/models/dedupe.model";
import {Button, Typography} from "@material-ui/core";

const styles = {
    root: {
        textAlign: 'center',
        color: 'white',
        position: 'relative'
    } as CSSProperties,
    status:{
        textTransform: 'uppercase',
        fontSize: 13,
    } as CSSProperties,
    save: {
        color: 'white'
    },
    buttons: {
        position: 'absolute',
        top: 30
    } as CSSProperties
};

function statusToText(status:InternalStatus):string{
    if (status===InternalStatus.localChanges) return 'UNSAVED';
    return status;
}

export default function StatusCell({dedupe}:{dedupe:DedupeModel}) {
    const status = getDedupeStatus(dedupe);
    return <div style={styles.root}>
        <Typography style={styles.status}>{statusToText(status)}</Typography>
        {status===InternalStatus.localChanges &&<div style={styles.buttons}>
            <Button>Cancel</Button>
            <Button style={styles.save}>Save</Button>
        </div>}
    </div>;
}