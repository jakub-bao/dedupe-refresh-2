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