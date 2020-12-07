import React from "react";
import {Button, Drawer, styled, Tab, Tabs, withStyles} from "@material-ui/core";
import {FiltersModel, FilterType} from "../models/filters.model";
import SelectFilter from "./selectFilter.component";
import FilterOptionsProvider from "../services/filterOptionsProvider.service";
import CheckboxFilter from "./checkboxFilter.component";
import MenuLogo from "./filtersLogo.component";
import {makeStyles} from "@material-ui/core/styles";
import {colors} from "../../../values/color.values";
import {Filters} from "../filters.component";
import {MenuUi} from "../services/uiModel";

export enum MenuVariant {
    search=0,
    batch=1
}

const useStyles = makeStyles({
    root: {
        backgroundColor: colors.backgroundSecondary,
        marginTop: 49,
        width: 200,
        paddingTop:0
    },
});

const MenuTab = styled(Tab)({
    minWidth: 100,
    height: 40
});

export  default function Menu({selectedFilters, onFiltersSelect, filterOptionsProvider, onSearchClick, menuUi,switchMenuTab}:{
    selectedFilters: FiltersModel,
    onFiltersSelect: (filterType:FilterType, filterValue:string|boolean)=>void,
    filterOptionsProvider: FilterOptionsProvider,
    onSearchClick: ()=>void,
    menuUi: MenuUi,
    switchMenuTab: (tabIndex:MenuVariant)=>void
}) {
    let classStyles = useStyles();
    return <Drawer
        anchor='left'
        variant="persistent"
        open={menuUi.open}
        classes={{paper: classStyles.root}}
    >
        <Tabs value={menuUi.menuTab} onChange={(event, tabIndex:number)=>switchMenuTab(tabIndex)}>
            <MenuTab label="Search"/>
            <MenuTab label="Batch"/>
        </Tabs>


        {/*<MenuLogo toggleMenu={filtersUi.collapseFilters}/>*/}
        <Filters selectedFilters={selectedFilters} onFiltersSelect={onFiltersSelect} filterOptionsProvider={filterOptionsProvider} onSearchClick={onSearchClick}/>
    </Drawer>;
}

// export default React.memo(Menu);