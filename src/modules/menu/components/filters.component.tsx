import {Button, withStyles} from "@material-ui/core";
import React from "react";
import {FiltersModel, FilterType} from "../models/filters.model";
import FilterOptionsProvider from "../services/filterOptionsProvider.service";
import SelectFilter from "./selectFilter.component";

const styles = {
    searchButton: {
        marginTop: 3
    }
}

function renderFilters(
    selectedFilters: FiltersModel,
    onFiltersSelect: (filterType:FilterType, filterValue:string|boolean)=>void,
    filterOptionsProvider: FilterOptionsProvider
) {
    return Object.keys(selectedFilters).map((filterType:FilterType)=>{
        let filterOptions;
        if (filterType!=='period') filterOptions = filterOptionsProvider.getFilterOptions(filterType);
        else filterOptions = filterOptionsProvider.getPeriodOptions(selectedFilters.dataType);
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

const SearchButton = withStyles({
    root: {
        borderRadius: 2
    },
    label: {
        position: 'relative',
        top: 1
    }
})(Button);

export function Filters({selectedFilters, onFiltersSelect, filterOptionsProvider, onSearchClick}:{
    selectedFilters: FiltersModel,
    onFiltersSelect: (filterType:FilterType, filterValue:string|boolean)=>void,
    filterOptionsProvider: FilterOptionsProvider,
    onSearchClick: ()=>void,
}){
    return <React.Fragment>
        {renderFilters(selectedFilters, onFiltersSelect, filterOptionsProvider)}
        <SearchButton style={styles.searchButton} variant="contained" color="primary" onClick={onSearchClick} disabled={!searchEnabled(selectedFilters)} data-testid='searchDedupes' disableElevation>
            Search Dedupes
        </SearchButton>
    </React.Fragment>
}