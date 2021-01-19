import {DedupeTestCase} from "../shared/models/test.models";
import {ResolutionMethodType} from "../../modules/results/models/dedupe.model";
import {checkCheckbox, isDisabled, nextPage, searchDedupes, switchToBatch} from "../shared/sharedBasics.testService";
import {click} from "../../test/domServices/click.testService";
import {textsIn} from "../../test/domServices/textsIn.testService";
import {FilterDedupeStatus} from "../../modules/menu/models/filters.model";
import {alreadyResolved, totalDedupes, unresolved} from "./batchNums.testValues";
import {BotswanaAllCase} from "./11.batchSelect.testCase";

function checkButtons(){
    isDisabled('batch_selectNone');
    checkCheckbox('all', false);
    checkCheckbox(1, false);
}

function selectAll(){
    click('batch_selectAll');
    isDisabled('batch_selectAll');
    checkCheckbox('all', true);
    checkCheckbox(1, true);
    textsIn('batch_stats',[`${totalDedupes} out of ${totalDedupes} selected`,`${alreadyResolved} already resolved`,`${unresolved} unresolved`]);
}

function page2(){
    nextPage();
    checkCheckbox(21, true);
    textsIn('batch_stats',[`${totalDedupes} out of ${totalDedupes} selected`,`${alreadyResolved} already resolved`,`${unresolved} unresolved`]);
}

function unselect(){
    click('batch_selectNone');
    checkCheckbox('all', false);
    checkCheckbox(21, false);
    textsIn('batch_stats',[`0 out of ${totalDedupes} selected`]);
}

function pageOnly(){
    click('batch_selectPage');
    checkCheckbox('all', false);
    checkCheckbox(21, true);
    textsIn('batch_stats',[`20 out of ${totalDedupes} selected`,'20 already resolved','0 unresolved']);
}

function page3(){
    nextPage();
    checkCheckbox(41, false);
}

test('11 > Batch Select', async ()=>{
    await searchDedupes(BotswanaAllCase);
    switchToBatch();
    checkButtons();
    switchToBatch();
    selectAll();
    page2();
    unselect();
    pageOnly();
    page3();
});