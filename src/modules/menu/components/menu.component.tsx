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
import {UiModel} from "../services/uiModel";

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

function Menu({selectedFilters, onFiltersSelect, filterOptionsProvider, onSearchClick, ui}:{
    selectedFilters: FiltersModel,
    onFiltersSelect: (filterType:FilterType, filterValue:string|boolean)=>void,
    filterOptionsProvider: FilterOptionsProvider,
    onSearchClick: ()=>void,
    ui: UiModel
}) {
    let classStyles = useStyles();
    return <Drawer
        anchor='left'
        variant="persistent"
        open={ui.menu.open}
        classes={{paper: classStyles.root}}
    >
        <Tabs value={null} onChange={null}>
            <MenuTab label="Search"/>
            <MenuTab label="Batch"/>
        </Tabs>


        {/*<MenuLogo toggleMenu={filtersUi.collapseFilters}/>*/}
        <Filters selectedFilters={selectedFilters} onFiltersSelect={onFiltersSelect} filterOptionsProvider={filterOptionsProvider} onSearchClick={onSearchClick}/>
    </Drawer>;
}

export default React.memo(Menu);