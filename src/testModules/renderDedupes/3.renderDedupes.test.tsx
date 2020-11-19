import {rdTestCases} from "./3.renderDedupes.testCases";
import {renderMain, searchDedupes} from "../shared/sharedBasics.testService";
import {
    checkRadioValue,
    click,
    loadingDone,
    noText, noTexts,
    select,
    text,
    texts
} from "../../test/domServices/domUtils.testService";
import {DedupeTestCase, TestResolution} from "../shared/models/test.models";

function renderDedupes(testCase:DedupeTestCase){
    test(`3 > Render Dedupes > ${testCase.name}`, async ()=>{
        await searchDedupes(testCase);
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