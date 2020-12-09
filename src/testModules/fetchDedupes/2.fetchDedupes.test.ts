import {FdTestCase, testCases} from "./2.fetchDedupes.testCases";
import fetchDedupes from "../../modules/results/services/dedupeDataProvider.service";
import {testAs} from "../../test/apiCache/getData/getData.service";
import {DedupeModel} from "../../modules/results/models/dedupe.model";

function cleanDedupes(dedupes:DedupeModel[]):DedupeModel[]{
    return dedupes.map(d=>{
        delete d.tableData;
        return d;
    });
}

function fetchDedupesTest(testCase:FdTestCase){
    test(`2 > Fetch Dedupes > ${testCase.name}`, async ()=>{
        testAs(testCase.testAs);
        let dedupes = await fetchDedupes(testCase.selectedFilters);
        expect(cleanDedupes(dedupes)).toStrictEqual(testCase.dedupes);
    });
}

testCases.forEach(fetchDedupesTest);