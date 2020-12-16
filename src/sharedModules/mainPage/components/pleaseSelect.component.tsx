import React from "react";
import {Typography} from "@material-ui/core";
import Arrow, {ArrowType} from "./arrow.component";

const styles={
    root: {
        marginLeft: 10
    },
    text: {
        color: '#545454',
        fontWeight: 300,
        marginLeft: 49
    },
    whitespace: {
        height: 64
    }
};

export enum PleaseSelectType{
    ou='ou'
}

const messages = {
    ou: 'Please select an Operating Unit, Data Type, and Period, and then click Search Dedupes'
}

export default function PleaseSelect({type}:{type:PleaseSelectType}) {
    return <div style={styles.root}>
        { <div style={styles.whitespace}/>}
        <Typography style={styles.text}>{messages[type]}</Typography>
        {<Arrow type={ArrowType.down}/>}
    </div>;
}