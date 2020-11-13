import React from "react";
import {Typography} from "@material-ui/core";
import Arrow, {ArrowType} from "./arrow.component";

const styles={
    root: {
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
    ou: 'Please select an Operating Unit'
}

export default function PleaseSelect({type}:{type:PleaseSelectType}) {
    return <React.Fragment>
        { <div style={styles.whitespace}/>}
        <Typography style={styles.root}>{messages[type]}</Typography>
        {<Arrow type={ArrowType.down}/>}
    </React.Fragment>;
}