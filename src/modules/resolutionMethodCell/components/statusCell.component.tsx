import React, {CSSProperties} from "react";
import {DedupeModel, InternalStatus} from "../../results/models/dedupe.model";
import {Button, CircularProgress, Typography} from "@material-ui/core";

export type ResolveDedupe = (id:number)=>void;
export type UnresolveDedupe = (id:number)=>void;

const styles = {
    root: {
        textAlign: 'center',
    } as CSSProperties,
    status:{
        fontSize: 13,
    } as CSSProperties,
    cancel: {
        left: 0
    },
    save: {
        right: 0,
        padding: '3px',
        minWidth: 72,
        marginTop: 15,
    } as CSSProperties,
    spacer:{
        height: 20
    },
    processing:{
        color: 'white'
    }
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

export function statusToText(status:InternalStatus):string{
    if (status===InternalStatus.processing) return 'Processing...';
    return camelCaseToHuman(status);
}

function getStatusStyle(status:InternalStatus):object{
    let color;
    if (status!==InternalStatus.unresolved) color = 'white';
    return Object.assign({},styles.status,{color:color});
}

export default function StatusCell({dedupe, resolveDedupe, unresolveDedupe}:{dedupe:DedupeModel, resolveDedupe:ResolveDedupe, unresolveDedupe:UnresolveDedupe}) {
    // @ts-ignore
    return <div style={styles.root} data-testid={`status_${dedupe.meta.internalId}`}>
        {dedupe.status!==InternalStatus.unresolved && <div style={styles.spacer}/>}
        <Typography style={getStatusStyle(dedupe.status)}>{statusToText(dedupe.status)}</Typography>
        {dedupe.status===InternalStatus.processing&&<CircularProgress style={styles.processing} size={25}/>}
        {dedupe.status===InternalStatus.readyToResolve && <Button
            variant='contained'
            style={styles.save}
            onClick={()=>resolveDedupe(dedupe.meta.internalId)}
            data-testid={`dedupe_${dedupe.meta.internalId}_resolve`}
            disableElevation
            size='small'>
            Resolve
        </Button>}
        {dedupe.status===InternalStatus.resolvedOnServer && <Button
            variant='contained'
            style={styles.save}
            onClick={()=>unresolveDedupe(dedupe.meta.internalId)}
            data-testid={`dedupe_${dedupe.meta.internalId}_unresolve`}
            disableElevation
            size='small'>
            Unresolve
        </Button>}
    </div>;
}