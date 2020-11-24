import {DedupeModel, DedupeResolutionMethodValue, updateStatus} from "../../results/models/dedupe.model";

const findDedupe = (dedupes: DedupeModel[],dedupeId:number, cb:any)=>{
    let dedupe = dedupes[dedupeId-1];
    if (dedupe.meta.internalId!==dedupeId) throw new Error('dedupe search wrong');
    // dedupes.forEach((dedupe:DedupeModel)=>{
        if (dedupe.meta.internalId!==dedupeId) return;
        cb(dedupe);
        updateStatus(dedupe);
    // });
    return dedupes;
}

export const changeResolutionMethod = (dedupes: DedupeModel[], dedupeId:number, resolvedBy:DedupeResolutionMethodValue)=>{
    return findDedupe(dedupes, dedupeId, (dedupe:DedupeModel)=>{
        dedupe.resolution.resolutionMethodValue = resolvedBy;
    });
};

export const setResolutionValue = (dedupes: DedupeModel[], dedupeId:number, customValue)=>{
    return findDedupe(dedupes, dedupeId, (dedupe:DedupeModel)=>{
        dedupe.resolution.resolutionMethodValue.resolutionValue = customValue;
        dedupe.resolution.resolutionMethodValue.deduplicationAdjustmentValue = customValue - dedupe.resolution.availableValues.sum;
    });
};