import {rdTestCases} from "./3.renderDedupes.testCases";
import {searchDedupes, switchToCustom} from "../shared/sharedBasics.testService";
import {checkRadioValue, noTexts} from "../../test/domServices/domUtils.testService";
import {DedupeTestCase, TestResolution} from "../shared/models/test.models";
import {textIn} from "../../test/domServices/textsIn.testService";

function renderDedupes(testCase:DedupeTestCase){
    test(`3 > Render Dedupes > ${testCase.name}`, async ()=>{
        await searchDedupes(testCase);
        if (!testCase.resolved) textIn('status_1','Unresolved');
        if (testCase.resolved) {
            testCase.resolved.forEach((resolution:TestResolution, i:number)=>{
                checkRadioValue(`resolution_${i+1}`, resolution.method);
                textIn(`status_${i+1}`,'Resolved on server');
            });
            noTexts(['Dedupe adjustments Agency','Dedupe adjustment']);
        }

        switchToCustom(1);
    });
}

rdTestCases.forEach(renderDedupes);