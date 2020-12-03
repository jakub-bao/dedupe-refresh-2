import {DedupeModel, ResolutionMethodType} from "../../results/models/dedupe.model";

export function getResolutionValue(dedupe: DedupeModel, resolutionMethod: ResolutionMethodType):number{
    if (resolutionMethod!==ResolutionMethodType.custom) return dedupe.resolution.availableValues[resolutionMethod];
    return dedupe.resolution.availableValues.maximum;
}