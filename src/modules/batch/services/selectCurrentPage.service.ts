import {DedupeModel} from "../../results/models/dedupe.model";
import {BatchPage} from "../../main/components/main.component";
import {SortColumn} from "../../results/components/resultsTable.component";

export function selectCurrentPage(dedupes:DedupeModel[],batchPage:BatchPage):void{
    let resorted:DedupeModel[];
    switch (batchPage.sortBy){
        case SortColumn.dataElement:
            resorted = dedupes.sort(((a, b) => a.info.dataElementName>a.info.dataElementName?1:-1))
            break;
        case SortColumn.disaggregation:
            resorted = dedupes.sort(((a, b) => a.data.disAggregation>a.data.disAggregation?1:-1))
            break;
        case SortColumn.ou:
            resorted = dedupes.sort(((a, b) => a.info.orgUnitName>a.info.orgUnitName?1:-1))
            break;
    }
    if (batchPage.sortDirection===1) resorted = resorted.reverse();
    let filtered = resorted.slice((batchPage.page-1)*batchPage.pageSize, (batchPage.page)*batchPage.pageSize);
    filtered.forEach(d=>{
        d.tableData.checked=true;
    });
}