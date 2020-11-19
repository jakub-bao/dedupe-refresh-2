import {testAs} from "../../test/apiCache/getData/getData.service";
import {RdTestCase, rdTestCases, TestResolution} from "./3.renderDedupes.testCases";
import {renderMain} from "../shared/sharedBasics.testService";
import {
    checkRadioValue,
    click,
    loadingDone,
    noText, noTexts,
    select,
    text,
    texts
} from "../../test/domServices/domUtils.testService";

function renderDedupes(testCase:RdTestCase){
    test(`3 > Render Dedupes > ${testCase.name}`, async ()=>{
        testAs(testCase.testAs);
        await renderMain();
        ['operatingUnit','dataType','period'].forEach((filter:string)=>{
            select(`filter_${filter}`,testCase.filters[filter]);
        });
        if (testCase.filters.includeResolved) click('filter_includeResolved');
        click('searchDedupes');
        await loadingDone();
        texts(testCase.expectedTokens);
        if (!testCase.resolved) {
            noTexts(['resolved','unsaved']);
            text('pending');
        }
        if (testCase.resolved) {
            testCase.resolved.forEach((resolution:TestResolution, i:number)=>checkRadioValue(`resolution_${i}`, resolution.method));
            noTexts(['pending','unsaved']);
            text('resolved');
        }
        click('resolution_0_custom');
        text('unsaved');
    });
}

rdTestCases.forEach(renderDedupes);