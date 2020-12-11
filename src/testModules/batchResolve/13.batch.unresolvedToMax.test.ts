import {searchDedupes, switchToBatch} from "../shared/sharedBasics.testService";
import {Rwanda1} from "../renderDedupes/3.renderDedupes.testCases";
import {checkboxValue, checkRadioValue, click} from "../../test/domServices/click.testService";
import {textIn, textsIn} from "../../test/domServices/textsIn.testService";

test(`13 > Unresolved to max`,async ()=>{
    await searchDedupes(Rwanda1);
    switchToBatch();
    click('batch_selectAll');
    textsIn('batch_stats',['2 out of 2 selected','2 unresolved']);
    click('batch_method_max');
    textsIn('batch_stats',['2 out of 2 selected','2 ready to resolve']);
    textIn('status_1','Ready to resolve');
    textIn('status_2','Ready to resolve');
    checkRadioValue(`resolution_1`, 'maximum');
    checkRadioValue(`resolution_2`, 'maximum');
});