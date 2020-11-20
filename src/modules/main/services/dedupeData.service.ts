import {DedupeModel, DedupeResolutionMethodValue} from "../../results/models/dedupe.model";
import {
    ChangeResolutionMethod,
    SetResolutionValue
} from "../../resolutionMethodCell/components/resolutionMethodCell.component";

const findDedupe = (dedupes: DedupeModel[],dedupeId:number, cb:any)=>{
    let newDedupes = JSON.parse(JSON.stringify(dedupes));
    newDedupes.forEach((dedupe:DedupeModel)=>{
        if (dedupe.meta.internalId!==dedupeId) return;
        cb(dedupe);
    });
    return newDedupes;
}

export const changeResolutionMethod = (dedupes: DedupeModel[], dedupeId:number, resolvedBy:DedupeResolutionMethodValue)=>{
    return findDedupe(dedupes, dedupeId, (dedupe:DedupeModel)=>{
        dedupe.resolution.resolutionMethodValue = resolvedBy;
    });
};

export const setResolutionValue = (dedupes: DedupeModel[], dedupeId:number, customValue)=>{
    return findDedupe(dedupes, dedupeId, (dedupe:DedupeModel)=>{
        dedupe.resolution.resolutionMethodValue.resolutionValue = customValue;
    });
};