import {DedupeTestCase} from "../shared/models/test.models";
import {ResolutionMethodType} from "../../modules/results/models/dedupe.model";
import {checkCheckbox, isDisabled, nextPage, searchDedupes, switchToBatch} from "../shared/sharedBasics.testService";
import {click} from "../../test/domServices/click.testService";
import {textsIn} from "../../test/domServices/textsIn.testService";
import {FilterDedupeStatus} from "../../modules/menu/models/filters.model";

export const BotswanaAllCase:DedupeTestCase = {
    testAs: 'test-de-superAdmin',
    name: `Botswana > MER Results > 2020 Summer`,
    filters: {
        operatingUnit: 'Botswana',
        dataType: 'MER Results',
        period: 'Jul - Sep 2020',
        status: FilterDedupeStatus.resolvedAndUnresolved
    },
    expectedTokens: [
        'OVC_HIVSTAT (N, DSD, ReportedStatus): OVC Disclosed Known HIV Status',
        'Kgatleng District',
        'STEPPING STONES INTERNATIONAL',
        'Project Concern International',
        'Sum (1191)'
    ],
    resolved: [{
        value:1191,
        method: ResolutionMethodType.sum
    },{
        value:309,
        method: ResolutionMethodType.sum
    }],
};

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
    textsIn('batch_stats',['918 out of 918 selected','899 already resolved','19 unresolved']);
}

function page2(){
    nextPage();
    checkCheckbox(21, true);
    textsIn('batch_stats',['918 out of 918 selected','899 already resolved','19 unresolved']);
}

function unselect(){
    click('batch_selectNone');
    checkCheckbox('all', false);
    checkCheckbox(21, false);
    textsIn('batch_stats',['0 out of 918 selected']);
}

function pageOnly(){
    click('batch_selectPage');
    checkCheckbox('all', false);
    checkCheckbox(21, true);
    textsIn('batch_stats',['20 out of 918 selected','20 already resolved','0 unresolved']);
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