import {
    checkCheckbox,
    clickCheckbox,
    searchDedupes,
    switchToBatch,
    switchToCustom
} from "../shared/sharedBasics.testService";
import {BotswanaAllCase} from "./11.batchSelect.test";
import {textIn} from "../../test/domServices/textsIn.testService";
import {click} from "../../test/domServices/click.testService";

function selectAll(){
    clickCheckbox('all');
    textIn('batch_stats_selected','All \\(918\\) dedupes');
    checkCheckbox(1, true);
}

function unselectOne(){
    clickCheckbox(1);
    textIn('batch_stats_selected','917 out of 918 dedupes');
    textIn('batch_stats_already','307 sum, 591 maximum');
}

function changeMethod(){
    click(`resolution_${1}_custom`);
    textIn('batch_stats_selected','917 out of 918 dedupes');
    textIn('batch_stats_already','307 sum, 591 maximum');
    click(`resolution_${2}_custom`);
    textIn('batch_stats_already','306 sum, 591 maximum');
    textIn('batch_stats_ready','1 custom');
}

test(`12 > Checkboxes`, async ()=>{
    await searchDedupes(BotswanaAllCase);
    switchToBatch();
    selectAll();
    unselectOne();
    changeMethod();
});