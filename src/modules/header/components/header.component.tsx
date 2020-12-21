import React, {CSSProperties} from "react";
import {IconButton, Tooltip, Typography} from "@material-ui/core";
import {FiltersModel} from "../../menu/models/filters.model";
import FilterOptionsProvider from "../../menu/services/filterOptionsProvider.service";
import {Menu} from "@material-ui/icons";

const styles = {
    chip: {marginLeft: 5},
    menuIcon: {},
    title: {
        fontSize: '1.1rem',
        fontWeight: 400,
        display: 'inline-block',
        position: 'relative',
        top: 2
    } as CSSProperties,
};

export function MenuIcon({toggleMenu}:{toggleMenu: ()=>void}){
    return <Tooltip title='Show menu'>
        <IconButton onClick={toggleMenu}>
            <Menu/>
        </IconButton>
    </Tooltip>
}



export default function Header({selectedFilters, filterOptionsProvider/*, ui*/}:{
    selectedFilters: FiltersModel,
    filterOptionsProvider: FilterOptionsProvider
    // ui: UiModel
}) {
    return <React.Fragment>
        <MenuIcon toggleMenu={null}/>
        <Typography color='primary' variant='h6' style={styles.title}>
            Data Deduplication
        </Typography>
    </React.Fragment>;
}