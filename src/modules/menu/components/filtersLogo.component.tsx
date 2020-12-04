import React, {CSSProperties} from "react";
import {IconButton, Tooltip, Typography} from "@material-ui/core";
import {ChevronLeft} from "@material-ui/icons";

const styles = {
    title: {
        fontSize: '1.1rem',
        fontWeight: 400,
        display: 'inline-block',
        marginTop: 10,
        marginBottom: 10
    } as CSSProperties,
    button: {
        position: 'relative',
        top: -2,
        left: 4
    } as CSSProperties,
}

export function CollapseIcon({toggleMenu}:{toggleMenu: ()=>void}){
    return <Tooltip title='Hide menu'>
        <IconButton onClick={toggleMenu} style={styles.button}>
            <ChevronLeft/>
        </IconButton>
    </Tooltip>
}

export default function MenuLogo({toggleMenu}:{ toggleMenu: ()=>void}) {
    return <div>
        <Typography color='primary' variant='h6' style={styles.title}>
            Data Deduplication
        </Typography>
        <CollapseIcon toggleMenu={toggleMenu}/>
    </div>
}