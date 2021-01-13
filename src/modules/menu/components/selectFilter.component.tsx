import React, {ChangeEvent} from "react";
import {FormControl, InputLabel, MenuItem, Select as MuiSelect, withStyles} from "@material-ui/core";
import {FilterType} from "../models/filters.model";
import {camelCaseToHuman} from "../../../sharedModules/shared/services/camelCase.service";
import {idName} from "../../../sharedModules/shared/models/idNameList.model";
import {makeStyles} from "@material-ui/core/styles";
import "./selectFilter.css";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: '3px 0px',
        '& .MuiInputBase-root': {
            backgroundColor: 'rgb(124 124 124 / 9%)',
            borderRadius:0,
            border: `1px solid rgba(213,213,213)`,
            '&:before':{
                borderBottom: 'none'
            }
        }
    },
    label:{
      fontSize: 15
    },
    select: {
        fontSize: 15,
    }
}));

function generateLabel(filterType:string){
    let required = '';
    if ([FilterType.dedupeType, FilterType.operatingUnit, FilterType.dataType, FilterType.period, FilterType.status].includes(filterType as FilterType)) required = ' *';
    return camelCaseToHuman(filterType) + required;
}

function getUnselectedLabel(filterType:FilterType):string{
    switch (filterType){
        case FilterType.agency: return 'All Agencies';
        case FilterType.technicalArea: return 'All Technical Areas'
    }
}

let Select = withStyles({
    root: {
        fontSize: 15,
        paddingTop: 18,
        paddingBottom: 4,
        fontWeight: 400
    },
    icon:{
        right: 4
    }
})(MuiSelect);

let Label = withStyles({
    root: {
        top: -2,
    }
})(InputLabel);

export default function SelectFilter({filterType, filterValue, onFilterSelect, filterOptions}:{
    filterType:FilterType,
    filterValue:string,
    onFilterSelect:(filterValue:string)=>void,
    filterOptions: idName[]
}) {
    const classes = useStyles();
    return <FormControl variant='filled' size='small' className={classes.formControl}>
        <Label id={`selectFilter_${filterType}`} className={classes.label}>{generateLabel(filterType)}</Label>
        <Select
            label={generateLabel(filterType)}
            labelId={`selectFilter_${filterType}`}
            data-testid={`filter_${filterType}`}
            value={filterValue||''}
            onChange={(event:ChangeEvent<any>)=>onFilterSelect(event.target.value)}
        >
            {filterOptions.map(option=><MenuItem value={option.id} key={option.id}>{option.name||<em>{getUnselectedLabel(filterType)}</em>}</MenuItem>)}
        </Select>
    </FormControl>;
}