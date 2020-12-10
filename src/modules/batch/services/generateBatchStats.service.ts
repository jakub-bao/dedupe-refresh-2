import {DedupeModel, DedupeResolutionMethodValue, ResolutionMethodType} from "../../results/models/dedupe.model";

export type BatchStatsModel = {
    allCount: number;
    selectedCount: number;
    maxCount: number;
    sumCount:number;
    customCount:number;
    unresolvedCount:number;
}

export function generateBatchStats(dedupes:DedupeModel[]):BatchStatsModel{
    if (!dedupes) return {selectedCount: null, allCount: null, customCount:null,maxCount:null,unresolvedCount:null,sumCount:null};
    let resolutions:DedupeResolutionMethodValue[] = dedupes.map(d=>d.resolution.resolutionMethodValue).filter(r=>r!==null);
    return {
        allCount: dedupes.length,
        selectedCount: dedupes.filter(d=>d.tableData.checked).length,
        maxCount: resolutions.filter(r=>r.resolutionMethod===ResolutionMethodType.maximum).length,
        sumCount:resolutions.filter(r=>r.resolutionMethod===ResolutionMethodType.sum).length,
        customCount:resolutions.filter(r=>r.resolutionMethod===ResolutionMethodType.custom).length,
        unresolvedCount:dedupes.filter(d=>d.resolution.resolutionMethodValue===null).length,
    }
}