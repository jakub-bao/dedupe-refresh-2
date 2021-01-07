import {clickCheckbox, searchDedupes} from "../shared/sharedBasics.testService";
import {Nigeria1} from "../renderDedupes/3.renderDedupes.testCases";
import {click} from "../../test/domServices/click.testService";

test(`15 > Batch Unset`,async ()=>{
    await searchDedupes(Nigeria1);
    clickCheckbox(1);
    click('batch_method_unset');
});