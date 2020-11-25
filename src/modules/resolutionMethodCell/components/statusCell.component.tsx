import React, {CSSProperties} from "react";
import {DedupeModel, InternalStatus} from "../../results/models/dedupe.model";
import {Button, IconButton, Tooltip, Typography} from "@material-ui/core";
import {Check, Close} from "@material-ui/icons";

export type SaveDedupe = (id:number)=>void;
export type UndoChanges = (id:number)=>void;


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

export default function StatusCell({dedupe, saveDedupe, undoChanges}:{dedupe:DedupeModel, saveDedupe:SaveDedupe, undoChanges:UndoChanges}) {
    // @ts-ignore
    return <div style={styles.root} data-testid={`status_${dedupe.meta.internalId}`}>
        <Typography style={styles.status}>{statusToText(dedupe.status)}</Typography>
        {dedupe.status===InternalStatus.localChanges &&<div style={styles.buttons}>
            <Tooltip title='Cancel'>
                <IconButton onClick={()=>undoChanges(dedupe.meta.internalId)} data-testid={`dedupe_${dedupe.meta.internalId}_cancel`} size='small'><Close/></IconButton>
            </Tooltip>
            <Tooltip title='Save'>
                <IconButton style={styles.save} onClick={()=>saveDedupe(dedupe.meta.internalId)} data-testid={`dedupe_${dedupe.meta.internalId}_save`} size='small'><Check/></IconButton>
            </Tooltip>
            {/*<Button onClick={()=>undoChanges(dedupe.meta.internalId)} data-testid={`dedupe_${dedupe.meta.internalId}_cancel`} size='small'>Cancel</Button>*/}
            {/*<Button style={styles.save} onClick={()=>saveDedupe(dedupe.meta.internalId)} data-testid={`dedupe_${dedupe.meta.internalId}_save`} size='small'>Save</Button>*/}
        </div>}
    </div>;
}