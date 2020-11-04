import {testAs} from "../../test/apiCache/getData/getData.service";
import {RdTestCase, rdTestCases} from "./3.renderDedupes.testCases";
import {renderMain} from "../shared/sharedBasics.testService";
import {click, debug, loadingDone, select, texts} from "../../test/domServices/domUtils.testService";

function renderDedupes(testCase:RdTestCase){
    test(`3 > Render Dedupes > ${testCase.name}`, async ()=>{
        testAs(testCase.testAs);
        await renderMain();
        ['organisationUnit','dataType','period'].forEach((filter:string)=>{
            select(`filter_${filter}`,testCase.filters[filter]);
        });
        if (testCase.filters.includeResolved) click('filter_includeResolved');
        click('searchDedupes');
        await loadingDone();
        texts(testCase.expectedTokens);
    });
}

rdTestCases.forEach(renderDedupes);