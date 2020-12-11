import {DedupeModel, InternalStatus, ResolutionMethodType} from "../../results/models/dedupe.model";

export type BatchStatsModel = {
    allCount: number;
    selectedCount: number;
    // readyToResolve: {
    //     maximum: number;
    //     sum:number;
    //     custom:number;
    // };
    // alreadyResolved: {
    //     maximum: number;
    //     sum: number;
    //     custom: number;
    // };
    readyToResolve:number;
    alreadyResolved:number;
    unresolved: number;
}

let empty = {
    allCount: null,
    selectedCount: null,
    readyToResolve:null,
    alreadyResolved:null,
    unresolved: null,
    // readyToResolve: {
    //     maximum: null,
    //     sum:null,
    //     custom:null,
    // },
    // alreadyResolved: {
    //     maximum: null,
    //     sum: null,
    //     custom: null,
    // },
    // unresolved: null,
}

function count(dedupes:DedupeModel[],method:ResolutionMethodType):number{
    return dedupes.filter(d=>d.resolution.resolutionMethodValue.resolutionMethod===method).length;
}

export function generateBatchStats(allDedupes:DedupeModel[]):BatchStatsModel{
    if (!allDedupes) return empty;
    let selectedDedupes:DedupeModel[] = allDedupes.filter(d=>d.tableData.checked);
    let readyToResolve:DedupeModel[] = selectedDedupes.filter(d=>d.status===InternalStatus.readyToResolve);
    let unresolved:DedupeModel[] = selectedDedupes.filter(d=>d.status===InternalStatus.unresolved);
    let alreadyResolved:DedupeModel[] = selectedDedupes.filter(d=>d.status===InternalStatus.resolvedOnServer);
    return {
        allCount: allDedupes.length,
        selectedCount: selectedDedupes.length,
        unresolved: unresolved.length,
        readyToResolve: readyToResolve.length,
        alreadyResolved: alreadyResolved.length
        // readyToResolve: {
        //     sum: count(readyToResolve, ResolutionMethodType.sum),
        //     maximum: count(readyToResolve, ResolutionMethodType.maximum),
        //     custom: count(readyToResolve, ResolutionMethodType.custom),
        // },
        // alreadyResolved: {
        //     sum: count(alreadyResolved, ResolutionMethodType.sum),
        //     maximum: count(alreadyResolved, ResolutionMethodType.maximum),
        //     custom: count(alreadyResolved, ResolutionMethodType.custom),
        // }
    }
}