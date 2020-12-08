import {DedupeModel} from "../../results/models/dedupe.model";
import {BatchStats} from "../../menu/components/batchResolveMenu.component";

export function generateBatchStats(dedupes:DedupeModel[]):BatchStats{
    if (!dedupes) return {selectedCount: null, allDedupesCount: null};
    return {
        selectedCount: dedupes.filter(d=>d.tableData.checked).length,
        allDedupesCount: dedupes.length
    }
}