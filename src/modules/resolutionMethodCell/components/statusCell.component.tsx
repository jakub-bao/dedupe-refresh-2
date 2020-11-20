import React, {CSSProperties} from "react";
import {DedupeModel, getDedupeStatus, InternalStatus} from "../../results/models/dedupe.model";
import {Button, Typography} from "@material-ui/core";

export type SaveDedupe = (dedupe:DedupeModel)=>void;

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
    if (status===InternalStatus.localChanges) return 'unsaved';
    return status;
}

export default function StatusCell({dedupe, saveDedupe}:{dedupe:DedupeModel, saveDedupe:SaveDedupe}) {
    const status = getDedupeStatus(dedupe);
    // @ts-ignore
    return <div style={styles.root} data-testid={`status_${dedupe.tableData.id}`}>
        <Typography style={styles.status}>{statusToText(status)}</Typography>
        {status===InternalStatus.localChanges &&<div style={styles.buttons}>
            <Button>Cancel</Button>
            <Button style={styles.save} onClick={()=>saveDedupe(dedupe)}>Save</Button>
        </div>}
    </div>;
}