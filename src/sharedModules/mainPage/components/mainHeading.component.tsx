import React from "react";
import {IconButton, Tooltip, Typography} from "@material-ui/core";
import {UserType} from "../models/userTypes.model";
import {ChevronLeft, Menu} from "@material-ui/icons";
import {camelCaseToHuman} from "../../shared/services/camelCase.service";
import {colors} from "../../../values/color.values";

export function MenuIcon({menuOpen, toggleMenu}:{menuOpen:boolean, toggleMenu: ()=>void}){
    return <Tooltip title={menuOpen?'Hide menu':'Show menu'}>
        <IconButton onClick={toggleMenu} style={menuOpen?{width: 10, height:10}:null}>
            {menuOpen?<ChevronLeft/>:<Menu/>}
        </IconButton>
    </Tooltip>
}

export default function MainHeading({userType, organizationName, menuOpen, toggleMenu}:{
    userType:UserType,
    organizationName: string,
    menuOpen: boolean,
    toggleMenu: ()=>void
}) {
    return <React.Fragment>
        <Typography variant='h5'>
            {!menuOpen && <MenuIcon menuOpen={menuOpen} toggleMenu={toggleMenu}/>}
            {organizationName} <span style={{color: colors.lightText}}>{camelCaseToHuman(userType)}</span>
        </Typography>
        <br/>
    </React.Fragment>;
}
