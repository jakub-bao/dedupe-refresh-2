import React, {ChangeEvent} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {FilterType} from "../models/filters.model";
import "./selectFilter.component.css"
import {camelCaseToHuman} from "../../../sharedModules/shared/services/camelCase.service";
import {idName} from "../../../sharedModules/shared/models/idNameList.model";


function generateLabel(filterType:string){
    let required = '';
    if ([FilterType.operatingUnit, FilterType.dataType, FilterType.period].includes(filterType as FilterType)) required = ' *';
    return camelCaseToHuman(filterType) + required;
}

export default function SelectFilter({filterType, filterValue, onFilterSelect, filterOptions}:{
    filterType:FilterType,
    filterValue:string,
    onFilterSelect:(filterValue:string)=>void,
    filterOptions: idName[]
}) {
    return <FormControl>
        <InputLabel id={`selectFilter_${filterType}`}>{generateLabel(filterType)}</InputLabel>
        <Select
            labelId={`selectFilter_${filterType}`}
            data-testid={`filter_${filterType}`}
            value={filterValue||''}
            onChange={(event:ChangeEvent<any>)=>onFilterSelect(event.target.value)}
            classes={{selectMenu: 'filters_menu'}}
        >
            {filterOptions.map(option=><MenuItem value={option.id} key={option.id}>{option.name}</MenuItem>)}
        </Select>
    </FormControl>;
}