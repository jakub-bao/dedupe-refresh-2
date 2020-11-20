import {rdTestCases} from "./3.renderDedupes.testCases";
import {renderMain, searchDedupes, switchToCustom} from "../shared/sharedBasics.testService";
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
import {noTextIn, textIn} from "../../test/domServices/textsIn.testService";

function renderDedupes(testCase:DedupeTestCase){
    test(`3 > Render Dedupes > ${testCase.name}`, async ()=>{
        await searchDedupes(testCase);
        if (!testCase.resolved) textIn('status_0','pending');
        if (testCase.resolved) {
            testCase.resolved.forEach((resolution:TestResolution, i:number)=>checkRadioValue(`resolution_${i}`, resolution.method));
            textIn('status_0','resolved');
        }
        switchToCustom(0);
    });
}

rdTestCases.forEach(renderDedupes);