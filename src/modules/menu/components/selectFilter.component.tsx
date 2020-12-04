import React, {ChangeEvent} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {FilterType} from "../models/filters.model";
import {camelCaseToHuman} from "../../../sharedModules/shared/services/camelCase.service";
import {idName} from "../../../sharedModules/shared/models/idNameList.model";
import {makeStyles} from "@material-ui/core/styles";

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
        fontSize: 15
    }

}));

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
    const classes = useStyles();
    return <FormControl variant='filled' size='small' className={classes.formControl}>
        <InputLabel id={`selectFilter_${filterType}`} className={classes.label}>{generateLabel(filterType)}</InputLabel>
        <Select
            label={generateLabel(filterType)}
            labelId={`selectFilter_${filterType}`}
            data-testid={`filter_${filterType}`}
            value={filterValue||''}
            onChange={(event:ChangeEvent<any>)=>onFilterSelect(event.target.value)}
            className={classes.select}
        >
            {filterOptions.map(option=><MenuItem value={option.id} key={option.id}>{option.name}</MenuItem>)}
        </Select>
    </FormControl>;
}