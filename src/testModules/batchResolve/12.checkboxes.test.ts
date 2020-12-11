import {
    checkCheckbox,
    clickCheckbox,
    searchDedupes,
    switchToBatch,
    switchToCustom
} from "../shared/sharedBasics.testService";
import {BotswanaAllCase} from "./11.batchSelect.test";
import {textIn, textsIn} from "../../test/domServices/textsIn.testService";
import {click} from "../../test/domServices/click.testService";

function selectAll(){
    clickCheckbox('all');
    textsIn('batch_stats',['918 out of 918 selected','899 already resolve','19 unresolved']);
    checkCheckbox(1, true);
}

function unselectOne(){
    clickCheckbox(1);
    textsIn('batch_stats',['917 out of 918 selected','898 already resolve','19 unresolved']);
}

test(`12 > Checkboxes`, async ()=>{
    await searchDedupes(BotswanaAllCase);
    switchToBatch();
    selectAll();
    unselectOne();
});