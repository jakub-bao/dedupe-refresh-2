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
        height: 40
    }
};

export enum PleaseSelectType{
    mechanism='mechanism',
    ou='ou'
}

const messages = {
    mechanism: 'Please select a Funding Mechanism to submit templates',
    ou: 'Please select an Operating Unit to review submitted templates'
}

export default function PleaseSelect({type}:{type:PleaseSelectType}) {
    return <React.Fragment>
        {type===PleaseSelectType.ou && <Arrow type={ArrowType.up}/>}
        {type===PleaseSelectType.mechanism && <div style={styles.whitespace}/>}
        <Typography style={styles.root}>{messages[type]}</Typography>
        {type===PleaseSelectType.mechanism && <Arrow type={ArrowType.down}/>}
    </React.Fragment>;
}