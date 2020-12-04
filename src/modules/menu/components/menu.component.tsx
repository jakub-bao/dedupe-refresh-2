import React from "react";
import {Button, Drawer} from "@material-ui/core";
import {FiltersModel, FilterType} from "../models/filters.model";
import SelectFilter from "./selectFilter.component";
import FilterOptionsProvider from "../services/filterOptionsProvider.service";
import {FiltersUiModel} from "./filtersUi.model";
import CheckboxFilter from "./checkboxFilter.component";
import MenuLogo from "./filtersLogo.component";
import {makeStyles} from "@material-ui/core/styles";
import {colors} from "../../../values/color.values";
import {Filters} from "../filters.component";

const useStyles = makeStyles({
    root: {
        backgroundColor: colors.backgroundSecondary,
        marginTop: 49,
        width: 200
    },
});


function Menu({selectedFilters, onFiltersSelect, filterOptionsProvider, onSearchClick, filtersUi}:{
    selectedFilters: FiltersModel,
    onFiltersSelect: (filterType:FilterType, filterValue:string|boolean)=>void,
    filterOptionsProvider: FilterOptionsProvider,
    onSearchClick: ()=>void,
    filtersUi: FiltersUiModel
}) {
    let classStyles = useStyles();
    return <Drawer
        anchor='left'
        variant="persistent"
        open={filtersUi.filtersOpen}
        classes={{paper: classStyles.root}}
    >


        {/*<MenuLogo toggleMenu={filtersUi.collapseFilters}/>*/}
        <Filters selectedFilters={selectedFilters} onFiltersSelect={onFiltersSelect} filterOptionsProvider={filterOptionsProvider} onSearchClick={onSearchClick}/>
    </Drawer>;
}

// export default Filters;

export default React.memo(Menu);