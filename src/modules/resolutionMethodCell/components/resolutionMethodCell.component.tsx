import {DedupeModel, DedupeResolutionMethodValue, ResolutionMethodType} from "../../results/models/dedupe.model";
import {FormControlLabel, RadioGroup, TextField, Typography, withStyles} from "@material-ui/core";
import {CompactRadio} from "../../results/components/compactRadio.component";
import React, {ReactElement} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {getResolutionValue} from "../services/getResolutionValue.service";
import {getAdjustmentValueByMethod} from "../services/getAdjustmentValue.service";

export type ChangeResolutionMethod = (dedupeId: number, resolvedBy: DedupeResolutionMethodValue) => void;
export type SetResolutionValue = (dedupeId: number, value: number) => void;

const styles = {
    root: {
        marginLeft: 10
    },
    label: {
        fontSize: 13
    },
    methodLabel:{
        fontWeight: 200
    }
}

const useStyles = makeStyles({
    label: {
        fontSize: 13
    },
    customLabel: {
        fontSize: 13
    }
});

function RadioLabel(props) {
    const classes = useStyles();
    return <FormControlLabel {...props} classes={{label: classes.label}}/>
}

function onResolutionChange(dedupe: DedupeModel, resolutionMethod: ResolutionMethodType, changeResolutionMethod: ChangeResolutionMethod) {
    let resolutionValue = getResolutionValue(dedupe, resolutionMethod);
    changeResolutionMethod(dedupe.meta.internalId, {
        resolutionMethod,
        resolutionValue,
        deduplicationAdjustmentValue: getAdjustmentValueByMethod(dedupe, resolutionMethod)
    });
}


const SmallTextField = withStyles({
    root: {
        '& .MuiInputBase-input': {
            padding: 5,
            fontSize: 13,
            width: 50
        },
        '& input:valid + fieldset': {},
        '& input:invalid + fieldset': {},
        '& input:valid:focus + fieldset': {},
    },
})(TextField);

function SetCustomValue({
                            value,
                            setValue,
                            visible
                        }: { value: number, setValue: (value: number) => void, visible: boolean }) {
    const classes = useStyles();
    return <React.Fragment>
        <Typography className={classes.customLabel}>Custom</Typography>
        {visible && <SmallTextField
            variant="outlined"
            type="number"
            size='small'
            value={value !== null ? value : ''}
            onChange={(event) => setValue(parseInt(event.target.value))}
            inputProps={{'data-testid': 'resolution_custom_input'}}
        />}
    </React.Fragment>
}

function MethodLabel({method, value}: { method: ResolutionMethodType, value: number }): ReactElement {
    let methodName;
    switch (method) {
        case ResolutionMethodType.maximum:
            methodName = 'Max';
            break;
        case ResolutionMethodType.sum:
            methodName = 'Sum';
            break;
    }
    return <Typography style={styles.label}>{methodName} <span style={styles.methodLabel}>({value})</span></Typography>;
}

export function ResolutionMethodCell({dedupe, changeResolutionMethod, setResolutionValue}: {dedupe: DedupeModel, changeResolutionMethod: ChangeResolutionMethod, setResolutionValue: SetResolutionValue}) {
    const resolutionSum = dedupe.resolution.availableValues.sum;
    const resolutionMax = dedupe.resolution.availableValues.maximum;
    // @ts-ignore
    let resolutionId = dedupe.meta.internalId;
    return <RadioGroup
        style={styles.root}
        value={dedupe.resolution.resolutionMethodValue && dedupe.resolution.resolutionMethodValue.resolutionMethod}
        onChange={(event) => onResolutionChange(dedupe, event.target.value as ResolutionMethodType, changeResolutionMethod)}>
        <RadioLabel value="maximum" control={<CompactRadio testId={`resolution_${resolutionId}_maximum`}/>}
                    label={<MethodLabel method={ResolutionMethodType.maximum} value={resolutionMax}/>}/>
        <RadioLabel value="sum" control={<CompactRadio testId={`resolution_${resolutionId}_sum`}/>}
                    label={<MethodLabel method={ResolutionMethodType.sum} value={resolutionSum}/>}/>
        <RadioLabel value="custom" control={<CompactRadio testId={`resolution_${resolutionId}_custom`}/>}
                    label={<SetCustomValue
                    value={dedupe.resolution.resolutionMethodValue && dedupe.resolution.resolutionMethodValue.resolutionValue}
                    setValue={(value) => setResolutionValue(dedupe.meta.internalId, value)}
                    visible={dedupe.resolution.resolutionMethodValue && dedupe.resolution.resolutionMethodValue.resolutionMethod === ResolutionMethodType.custom}/>}
        />
    </RadioGroup>
}