import {checkCheckbox, clickCheckbox, searchDedupes, switchToBatch} from "../shared/sharedBasics.testService";
import {textsIn} from "../../test/domServices/textsIn.testService";
import {alreadyResolved, totalDedupes, unresolved} from "./batchNums.testValues";
import {BotswanaAllCase} from "./11.batchSelect.testCase";

function selectAll(){
    clickCheckbox('all');
    textsIn('batch_stats',[`${totalDedupes} out of ${totalDedupes} selected`,`${alreadyResolved} already resolve`,`${unresolved} unresolved`]);
    checkCheckbox(1, true);
}

function unselectOne(){
    clickCheckbox(1);
    textsIn('batch_stats',[`${totalDedupes-1} out of ${totalDedupes} selected`,`${alreadyResolved-1} already resolve`,`${unresolved} unresolved`]);
}

test(`12 > Checkboxes`, async ()=>{
    await searchDedupes(BotswanaAllCase);
    switchToBatch();
    selectAll();
    unselectOne();
});