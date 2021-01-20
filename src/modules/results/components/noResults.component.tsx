import React, {CSSProperties} from "react";
import {Typography} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const styles = {
    root:{
        margin: '40px 30px',
        textAlign: 'center',
        width: 435
    } as CSSProperties,
    icon:{
        fontSize: '3.2rem',
        color: '#00000059'
    },
    text:{
        fontWeight: 300
    }
};


export default function NoResults() {
    return <div style={styles.root}>
        <SearchIcon fontSize='large' style={styles.icon}/>
        <Typography style={styles.text}>No duplicates found matching the selected criteria</Typography>
    </div>;
}