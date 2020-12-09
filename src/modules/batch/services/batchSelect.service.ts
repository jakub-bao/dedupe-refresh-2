import {DedupeModel} from "../../results/models/dedupe.model";
import {SelectionType} from "../../menu/components/batchResolveMenu.component";

export function batchSelectDedupes(dedupes:DedupeModel[], selectionType:SelectionType):DedupeModel[]{
    switch(selectionType){
        case SelectionType.allMatching:
            dedupes.forEach(d=>d.tableData.checked=true);
            break;
        case SelectionType.onlyOnPage:
            
            break;
        case SelectionType.none:
            dedupes.forEach(d=>d.tableData.checked=false);
            break;
    }
    return dedupes;
}