import React from "react";
import {Button, Chip, Divider, Typography} from "@material-ui/core";
import {FiltersUiModel} from "../../filters/components/filtersUi.model";
import {FiltersModel, FilterType} from "../../filters/models/filters.model";
import {Filter} from "@material-ui/icons";
import FilterOptionsProvider from "../../filters/services/filterOptionsProvider.service";
import {MenuIcon} from "../../filters/components/filtersLogo.component";

const styles = {
    chip: {marginLeft: 5}
};

function renderFilterList(selectedFilters:FiltersModel, filterOptionsProvider:FilterOptionsProvider) {
    if (!selectedFilters) return null;
    return Object.keys(selectedFilters)
        .filter(filterType=>selectedFilters[filterType])
        .map((filterType:FilterType)=>{
            const valueName = filterOptionsProvider.getValueNameById(filterType, selectedFilters[filterType]);
            return <Chip label={valueName} size="small" style={styles.chip} key={valueName}/>
    });
}

export default function Header({selectedFilters, filterOptionsProvider, filtersUi}:{
    selectedFilters: FiltersModel,
    filterOptionsProvider: FilterOptionsProvider
    filtersUi: FiltersUiModel
}) {
    return <React.Fragment>
        <div>
            {!filtersUi.filtersOpen && <MenuIcon menuOpen={filtersUi.filtersOpen} toggleMenu={filtersUi.collapseFilters}/>}
            {renderFilterList(selectedFilters, filterOptionsProvider)}
        </div>
    </React.Fragment>;
}