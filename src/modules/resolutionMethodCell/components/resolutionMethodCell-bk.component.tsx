import React from "react";
import {DedupeModel, DedupeResolvedByModel, ResolutionMethodType} from "../../results/models/dedupe.model";
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {CompactRadio} from "../../results/components/compactRadio.component";

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

export default class ResolutionMethodCellbk extends React.Component<{dedupe:DedupeModel}, {
    resolvedBy: DedupeResolvedByModel,
}>{
    constructor(props) {
        super(props);
        this.state = {
            resolvedBy: this.props.dedupe.resolution.resolvedBy
        };
    }

    countAdjustmentValue(dedupe:DedupeModel, method: ResolutionMethodType):number{
        if (method===ResolutionMethodType.maximum) return dedupe.resolution.availableValues.maximum - dedupe.resolution.availableValues.sum;
        if (method===ResolutionMethodType.sum) return 0;
        if (method===ResolutionMethodType.custom) throw new Error('todo custom value');
    }

    onResolutionMethodChange = (event)=>{
        let newMethod: ResolutionMethodType = event.target.value;
        if (newMethod===ResolutionMethodType.maximum || newMethod===ResolutionMethodType.sum) {
            this.setState({resolvedBy:{
                    resolutionValue: this.props.dedupe.resolution.availableValues[newMethod as string],
                    resolutionMethod: newMethod,
                    deduplicationAdjustmentValue: this.countAdjustmentValue(this.props.dedupe, newMethod)
                }
            });
        }
    };

    render() {
        const resolutionSum = this.props.dedupe.resolution.availableValues.sum;
        const resolutionMax = this.props.dedupe.resolution.availableValues.maximum;
        let resolutionId = makeId(this.props.dedupe.data.disAggregation);
        return <RadioGroup style={styles.root} value={this.state.resolvedBy?this.state.resolvedBy.resolutionMethod:''} onChange={this.onResolutionMethodChange}>
            <RadioLabel value="maximum" control={<CompactRadio testId={`resolution_${resolutionId}_maximum`}/>} label={`Maximum (${resolutionMax})`}/>
            <RadioLabel value="sum" control={<CompactRadio testId={`resolution_${resolutionId}_sum`}/>} label={`Sum (${resolutionSum})`}/>
            <RadioLabel value="custom" control={<CompactRadio testId={`resolution_${resolutionId}_custom`}/>} label={`Custom Value`}/>
        </RadioGroup>
    }
}