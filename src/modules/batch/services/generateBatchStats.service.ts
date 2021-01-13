import {DedupeModel, InternalStatus} from "../../results/models/dedupe.model";

export type BatchStatsModel = {
    allCount: number;
    selectedCount: number;
    readyToResolve:number;
    readyToUnresolve:number;
    alreadyResolved:number;
    unresolved: number;
    maximum: number;
    sum: number;
}

let empty = {
    allCount: null,
    selectedCount: null,
    readyToResolve:null,
    readyToUnresolve: null,
    alreadyResolved:null,
    unresolved: null,
    sum:null,
    maximum: null
}

export function generateBatchStats(allDedupes:DedupeModel[]):BatchStatsModel{
    if (!allDedupes) return empty;
    let selectedDedupes:DedupeModel[] = allDedupes.filter(d=>d.tableData.checked);
    let readyToResolve:DedupeModel[] = selectedDedupes.filter(d=>d.status===InternalStatus.readyToResolve);
    let readyToUnresolve:DedupeModel[] = selectedDedupes.filter(d=>d.status===InternalStatus.readyToUnresolve);
    let unresolved:DedupeModel[] = selectedDedupes.filter(d=>d.status===InternalStatus.unresolved);
    let alreadyResolved:DedupeModel[] = selectedDedupes.filter(d=>d.status===InternalStatus.resolvedOnServer);
    return {
        allCount: allDedupes.length,
        selectedCount: selectedDedupes.length,
        unresolved: unresolved.length,
        readyToResolve: readyToResolve.length,
        readyToUnresolve: readyToUnresolve.length,
        alreadyResolved: alreadyResolved.length,
        sum: null,
        maximum: null
    }
}