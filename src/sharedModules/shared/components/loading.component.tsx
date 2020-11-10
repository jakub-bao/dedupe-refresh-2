import React, {CSSProperties} from "react";
import {CircularProgress, Typography} from "@material-ui/core";

const styles = {
    root: {
        textAlign: 'center',
    } as CSSProperties
};

const getStyle = (margin:number)=>Object.assign({},styles.root, {marginTop:margin});

export default function Loading({message, margin, size}:{message?:string, margin?:number, size?: number}) {
    return <div style={getStyle(margin)}>
        <CircularProgress size={size||50}/>
        <br/>
        <Typography data-testid='loading' color="primary" >{message}</Typography>
    </div>;
}