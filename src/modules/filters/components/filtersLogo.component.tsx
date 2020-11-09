import React, {CSSProperties} from "react";
import {IconButton, Tooltip, Typography} from "@material-ui/core";
import {ChevronLeft, Menu} from "@material-ui/icons";

const styles = {
    root: {
        fontSize: '1.1rem',
        margin: '0px 15px 15px 15px',
        fontWeight: 400
    } as CSSProperties,
    collapseIcon:{
        float: 'right',
    }as CSSProperties
}

export function MenuIcon({menuOpen, toggleMenu}:{menuOpen:boolean, toggleMenu: ()=>void}){
    return <Tooltip title={menuOpen?'Hide menu':'Show menu'}>
        <IconButton onClick={toggleMenu} style={menuOpen?{width: 10, height:10}:null}>
            {menuOpen?<ChevronLeft/>:<Menu/>}
        </IconButton>
    </Tooltip>
}

export default function MenuLogo({menuOpen, toggleMenu}:{menuOpen:boolean, toggleMenu: ()=>void}) {
    return <Typography color='primary' variant='h6' style={styles.root}>
        {menuOpen && <div style={styles.collapseIcon}><MenuIcon menuOpen={menuOpen} toggleMenu={toggleMenu}/></div>}
        Data Deduplication
    </Typography>
}