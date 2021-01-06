import {Button} from "@material-ui/core";
import React from "react";
import {FiltersModel, FilterType} from "../models/filters.model";
import FilterOptionsProvider from "../services/filterOptionsProvider.service";
import CheckboxFilter from "./checkboxFilter.component";
import SelectFilter from "./selectFilter.component";


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

export function Filters({selectedFilters, onFiltersSelect, filterOptionsProvider, onSearchClick}:{
    selectedFilters: FiltersModel,
    onFiltersSelect: (filterType:FilterType, filterValue:string|boolean)=>void,
    filterOptionsProvider: FilterOptionsProvider,
    onSearchClick: ()=>void,
}){
    return <React.Fragment>
        {renderFilters(selectedFilters, onFiltersSelect, filterOptionsProvider)}
        <br/>
        <Button variant="contained" color="primary" onClick={onSearchClick} disabled={!searchEnabled(selectedFilters)} data-testid='searchDedupes' disableElevation>
            Search Dedupes
        </Button>
    </React.Fragment>
}