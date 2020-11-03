import React from "react";
import {
    DedupeModel,
    DedupeResolutionModel,
    DedupeResolvedByModel,
    ResolutionMethodType
} from "../../results/models/dedupe.model";
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";

export default class ResolutionMethodCell extends React.Component<{dedupe:DedupeModel}, {
    resolvedBy: DedupeResolvedByModel,
}>{
    constructor(props) {
        super(props);
        this.state = {
            resolvedBy: this.props.dedupe.resolution.resolvedBy
        };
    }

    countAdjustmentValue(dedupe:DedupeModel, method: ResolutionMethodType):number{
        if (method===ResolutionMethodType.maximum) return dedupe.resolution.availableValues.max - dedupe.resolution.availableValues.sum;
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
        const resolutionMax = this.props.dedupe.resolution.availableValues.max;
        return <RadioGroup value={this.state.resolvedBy?this.state.resolvedBy.resolutionMethod:''} onChange={this.onResolutionMethodChange} className='cypress_resolutionMethodCell'>
            <FormControlLabel value="maximum" control={<Radio/>} label={`Maximum (${resolutionMax})`} className='cypress__maximum'/>
            <FormControlLabel value="sum" control={<Radio/>} label={`Sum (${resolutionSum})`} className='cypress__sum'/>
            <FormControlLabel value="custom" control={<Radio/>} label={`Custom Value`} className='cypress__custom'/>
        </RadioGroup>
    }
}