import {DedupeTestCase} from "../shared/models/test.models";
import {ResolutionMethodType} from "../../modules/results/models/dedupe.model";
import {checkCheckbox, isDisabled, nextPage, searchDedupes, switchToBatch} from "../shared/sharedBasics.testService";
import {screen} from "@testing-library/react";
import {Simulate} from "react-dom/test-utils";
import { click } from "../../test/domServices/click.testService";
import {textIn} from "../../test/domServices/textsIn.testService";

export const BotswanaAllCase:DedupeTestCase = {
    testAs: 'test-de-superAdmin',
    name: `Botswana > MER Results > 2020 Summer`,
    filters: {
        operatingUnit: 'Botswana',
        dataType: 'MER Results',
        period: 'Jul - Sep 2020',
        includeResolved: true
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
    textIn('batch_stats_selected','No dedupes');
}

function selectAll(){
    click('batch_selectAll');
    isDisabled('batch_selectAll');
    checkCheckbox('all', true);
    checkCheckbox(1, true);
    textIn('batch_stats_selected','All \\(918\\) dedupes');
    textIn('batch_stats_already','308 sum, 591 maximum');
    textIn('batch_stats_unresolved','19 dedupes');
}

function page2(){
    nextPage();
    checkCheckbox(21, true);
    textIn('batch_stats_selected','All \\(918\\) dedupes');
}

function unselect(){
    click('batch_selectNone');
    checkCheckbox('all', false);
    checkCheckbox(21, false);
    textIn('batch_stats_selected','No dedupes');
}

function pageOnly(){
    click('batch_selectPage');
    checkCheckbox('all', false);
    checkCheckbox(21, true);
    textIn('batch_stats_selected','20 out of 918 dedupes');
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