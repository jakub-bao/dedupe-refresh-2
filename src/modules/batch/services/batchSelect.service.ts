import {DedupeModel} from "../../results/models/dedupe.model";
import {SelectionType} from "../../menu/components/batchResolveMenu.component";
import {selectCurrentPage} from "./selectCurrentPage.service";
import {BatchPage} from "../../main/components/main.component";

export function batchSelectDedupes(dedupes:DedupeModel[], selectionType:SelectionType, batchPage:BatchPage):DedupeModel[]{
    switch(selectionType){
        case SelectionType.allMatching:
            dedupes.forEach(d=>d.tableData.checked=true);
            break;
        case SelectionType.onlyOnPage:
            selectCurrentPage(dedupes, batchPage);
            break;
        case SelectionType.none:
            dedupes.forEach(d=>d.tableData.checked=false);
            break;
    }
    return dedupes;
}