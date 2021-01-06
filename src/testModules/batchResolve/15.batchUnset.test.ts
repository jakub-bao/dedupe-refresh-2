import {clickCheckbox, searchDedupes} from "../shared/sharedBasics.testService";
import {Nigeria1} from "../renderDedupes/3.renderDedupes.testCases";

test(`15 > Batch Unset`,async ()=>{
    await searchDedupes(Nigeria1);
    clickCheckbox(1);
});