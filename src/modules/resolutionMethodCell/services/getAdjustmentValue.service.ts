import {DedupeModel, ResolutionMethodType} from "../../results/models/dedupe.model";

export function getAdjustmentValue(dedupe:DedupeModel, method: ResolutionMethodType):number{
    if (method===ResolutionMethodType.maximum) return dedupe.resolution.availableValues.maximum - dedupe.resolution.availableValues.sum;
    if (method===ResolutionMethodType.sum) return 0;
    if (method===ResolutionMethodType.custom) return dedupe.resolution.availableValues.minimum;
}