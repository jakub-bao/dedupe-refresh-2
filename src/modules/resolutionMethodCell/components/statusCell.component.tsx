import React, {CSSProperties} from "react";
import {DedupeModel, InternalStatus} from "../../results/models/dedupe.model";
import {Button, Typography} from "@material-ui/core";

export type SaveDedupe = (id:number)=>void;


const styles = {
    root: {
        textAlign: 'center',
        color: 'white',
        position: 'relative'
    } as CSSProperties,
    status:{
        fontSize: 13,
    } as CSSProperties,
    cancel: {
        left: 0
    },
    save: {
        color: 'white',
        right: 0,
        padding: '3px',
        minWidth: 55
    } as CSSProperties
};

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
}

function camelCaseToHuman(text:string):string {
    var words = text.match(/[A-Za-z][a-z]*/g) || [];
    words = words.map(w=>w.toLowerCase());
    words[0] = capitalize(words[0]);
    return words.join(" ");
}

function statusToText(status:InternalStatus):string{
    return camelCaseToHuman(status);
}

export default function StatusCell({dedupe, saveDedupe}:{dedupe:DedupeModel, saveDedupe:SaveDedupe}) {
    // @ts-ignore
    return <div style={styles.root} data-testid={`status_${dedupe.meta.internalId}`}>
        <Typography style={styles.status}>{statusToText(dedupe.status)}</Typography>
        {dedupe.status===InternalStatus.readyToResolve && <Button
            variant='contained'
            style={styles.save}
            onClick={()=>saveDedupe(dedupe.meta.internalId)}
            data-testid={`dedupe_${dedupe.meta.internalId}_resolve`}
            disableElevation
            size='small'>
            Resolve
        </Button>}
    </div>;
}