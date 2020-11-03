import {FdTestCase, testCases} from "./2.fetchDedupes.testCases";
import fetchDedupes from "../../modules/results/services/dedupeDataProvider.service";
import {testAs} from "../../test/apiCache/getData/getData.service";


function fetchDedupesTest(testCase:FdTestCase){
    test(`2 > Fetch Dedupes > ${testCase.name}`, async ()=>{
        testAs(testCase.testAs);
        let dedupes = await fetchDedupes(testCase.selectedFilters);
        expect(dedupes).toStrictEqual(testCase.dedupes);
    });
}

testCases.forEach(fetchDedupesTest);