import {DedupeModel, DedupeResolvedByModel, ResolutionMethodType} from "../../results/models/dedupe.model";
import {FormControlLabel, RadioGroup} from "@material-ui/core";
import {CompactRadio} from "../../results/components/compactRadio.component";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {getResolutionValue} from "../services/getResolutionValue.service";
import {getAdjustmentValue} from "../services/getAdjustmentValue.service";

export type ChangeResolutionMethod = (dedupeId: number, resolvedBy:DedupeResolvedByModel)=>void;

function makeId(long:string):string{
    return long.substr(0,5).replace(/[^A-z0-9]/,'')
}

const styles = {
    root: {
        marginLeft: 10
    }
}

const useStyles = makeStyles({
    label: {
        fontSize: 13
    }
});

function RadioLabel(props){
    const classes = useStyles();
    return <FormControlLabel {...props} classes={{label: classes.label}}/>
}

function onResolutionChange(dedupe: DedupeModel, resolutionMethod: ResolutionMethodType, changeResolutionMethod:ChangeResolutionMethod) {
        let resolutionValue = getResolutionValue(dedupe, resolutionMethod);
        changeResolutionMethod(dedupe.meta.dedupeGroupId, {
            resolutionMethod,
            resolutionValue,
            deduplicationAdjustmentValue: getAdjustmentValue(dedupe, resolutionMethod)
        });
}

export function ResolutionMethodCell({dedupe, changeResolutionMethod}:{dedupe:DedupeModel, changeResolutionMethod:ChangeResolutionMethod}){
    const resolutionSum = dedupe.resolution.availableValues.sum;
    const resolutionMax = dedupe.resolution.availableValues.maximum;
    let resolutionId = makeId(dedupe.data.disAggregation);
    return <RadioGroup
        style={styles.root}
        value={dedupe.resolution.resolvedBy&&dedupe.resolution.resolvedBy.resolutionMethod}
        onChange={(event)=>onResolutionChange(dedupe, event.target.value as ResolutionMethodType, changeResolutionMethod)}>
        <RadioLabel value="maximum" control={<CompactRadio testId={`resolution_${resolutionId}_maximum`}/>} label={`Maximum (${resolutionMax})`}/>
        <RadioLabel value="sum" control={<CompactRadio testId={`resolution_${resolutionId}_sum`}/>} label={`Sum (${resolutionSum})`}/>
        <RadioLabel value="custom" control={<CompactRadio testId={`resolution_${resolutionId}_custom`}/>} label={`Custom Value`}/>
    </RadioGroup>
}