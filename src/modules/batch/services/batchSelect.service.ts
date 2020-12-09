import {DedupeModel} from "../../results/models/dedupe.model";
import {SelectionType} from "../../menu/components/batchResolveMenu.component";

function selectPageOnly(dedupes:DedupeModel[]){
    let ids:number[] = [...document.querySelectorAll('[data-type="batch_checkbox"]')].map(c=>parseInt(c.getAttribute('data-internalId')));
    dedupes.filter(d=>ids.includes(d.meta.internalId)).forEach((d:DedupeModel)=>{
        d.tableData.checked = true;
    });
}

export function batchSelectDedupes(dedupes:DedupeModel[], selectionType:SelectionType):DedupeModel[]{
    switch(selectionType){
        case SelectionType.allMatching:
            dedupes.forEach(d=>d.tableData.checked=true);
            break;
        case SelectionType.onlyOnPage:
            selectPageOnly(dedupes);
            break;
        case SelectionType.none:
            dedupes.forEach(d=>d.tableData.checked=false);
            break;
    }
    return dedupes;
}