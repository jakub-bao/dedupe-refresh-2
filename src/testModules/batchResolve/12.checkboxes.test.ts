import {checkCheckbox, clickCheckbox, searchDedupes, switchToBatch} from "../shared/sharedBasics.testService";
import {BotswanaAllCase} from "./11.batchSelect.test";
import {textIn} from "../../test/domServices/textsIn.testService";

function selectAll(){
    clickCheckbox('all');
    textIn('batch_stats_selected','All \\(918\\) dedupes');
    checkCheckbox(1, true);
}

function unselectOne(){
    clickCheckbox(1);
    textIn('batch_selected','917 out of 918 dedupes');
}

test(`12 > Checkboxes`, async ()=>{
    await searchDedupes(BotswanaAllCase);
    switchToBatch();
    selectAll();
    unselectOne();
});