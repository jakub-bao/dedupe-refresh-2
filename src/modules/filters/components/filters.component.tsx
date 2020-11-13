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

const useStyles = makeStyles({
    root: {
        backgroundColor: colors.backgroundSecondary,
        marginTop: 49
    },
});

function renderFilters(
    selectedFilters: FiltersModel,
    onFiltersSelect: (filterType:FilterType, filterValue:string|boolean)=>void,
    filterOptionsProvider: FilterOptionsProvider
) {
        return Object.keys(selectedFilters).map((filterType:FilterType)=>{
            let filterOptions;
            if (filterType!=='period') filterOptions = filterOptionsProvider.getFilterOptions(filterType);
            else filterOptions = filterOptionsProvider.getPeriodOptions(selectedFilters.dataType);
            if (filterType===FilterType.includeResolved) return <CheckboxFilter
                key={0}
                checked={selectedFilters.includeResolved}
                label='Include Resolved'
                onChange={()=>onFiltersSelect(FilterType.includeResolved, !selectedFilters.includeResolved)}
            />
            return <SelectFilter
                key={filterType}
                filterType={filterType}
                filterValue={selectedFilters[filterType]}
                onFilterSelect={(filterValue:string)=>onFiltersSelect(filterType, filterValue)}
                filterOptions={filterOptions}
            />
        });
}


function searchEnabled(selectedFilters:FiltersModel):boolean{
    return !!selectedFilters.operatingUnit && !!selectedFilters.dataType && !!selectedFilters.period;
}

export default function Filters({selectedFilters, onFiltersSelect, filterOptionsProvider, onSearchClick, filtersUi}:{
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
        <MenuLogo menuOpen={filtersUi.filtersOpen} toggleMenu={filtersUi.collapseFilters}/>
        {renderFilters(selectedFilters, onFiltersSelect, filterOptionsProvider)}
        <br/>
        <Button variant="contained" color="primary" onClick={onSearchClick} disabled={!searchEnabled(selectedFilters)} data-testid='searchDedupes'>
            Search Dedupes
        </Button>
    </Drawer>;
}