import {
    DedupeModel,
    DedupeResolutionMethodValue,
    InternalStatus,
    ResolutionMethodType
} from "../../results/models/dedupe.model";

export function getSelected(dedupes:DedupeModel[]):DedupeModel[]{
    return dedupes.filter(d=>d.tableData.checked);
}
export function batchSetMethod(dedupes:DedupeModel[], method:ResolutionMethodType){
    getSelected(dedupes).forEach(d=>{
        if (!d.resolution.resolutionMethodValue) d.resolution.resolutionMethodValue={
            resolutionValue: null,
            resolutionMethod: null,
            deduplicationAdjustmentValue: null
        };
        let rmv:DedupeResolutionMethodValue = d.resolution.resolutionMethodValue;
        if (rmv.resolutionMethod===method) return;
        rmv.resolutionMethod = method;
        let value = d.resolution.availableValues[method];
        rmv.resolutionValue = value;
        rmv.deduplicationAdjustmentValue = value - d.resolution.availableValues.sum;
        d.status = InternalStatus.readyToResolve;
    })
}

export function batchUnsetMethod(dedupes:DedupeModel[]){
    getSelected(dedupes).forEach(d=>{
        let rmv:DedupeResolutionMethodValue = d.resolution.resolutionMethodValue;
        if (!rmv||!rmv.resolutionMethod) return;
        if (!d.resolution.original_resolutionMethodValue||!d.resolution.original_resolutionMethodValue.resolutionMethod) d.status = InternalStatus.unresolved;
        else d.status = InternalStatus.readyToUnresolve;
        rmv.resolutionMethod = null;
        rmv.resolutionValue = null;
        rmv.deduplicationAdjustmentValue = null;
    })
}