import React, {CSSProperties} from "react";
import {IconButton, Tooltip, Typography} from "@material-ui/core";
import {FiltersUiModel} from "../../menu/components/filtersUi.model";
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

// function renderFilterList(selectedFilters:FiltersModel, filterOptionsProvider:FilterOptionsProvider) {
//     if (!selectedFilters) return null;
//     return Object.keys(selectedFilters)
//         .filter(filterType=>selectedFilters[filterType])
//         .map((filterType:FilterType)=>{
//             const valueName = filterOptionsProvider.getValueNameById(filterType, selectedFilters[filterType]);
//             return <Chip label={valueName} size="small" style={styles.chip} key={valueName}/>
//     });
// }

export function MenuIcon({toggleMenu}:{toggleMenu: ()=>void}){
    return <Tooltip title='Show menu'>
        <IconButton onClick={toggleMenu}>
            <Menu/>
        </IconButton>
    </Tooltip>
}



export default function Header({selectedFilters, filterOptionsProvider, filtersUi}:{
    selectedFilters: FiltersModel,
    filterOptionsProvider: FilterOptionsProvider
    filtersUi: FiltersUiModel
}) {
    return <React.Fragment>
        <MenuIcon toggleMenu={filtersUi.collapseFilters}/>
        <Typography color='primary' variant='h6' style={styles.title}>
            Data Deduplication
        </Typography>
    </React.Fragment>;
}