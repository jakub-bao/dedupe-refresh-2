import {DedupeTestCase} from "../shared/models/test.models";
import {ResolutionMethodType} from "../../modules/results/models/dedupe.model";
import {checkbox, isDisabled, nextPage, searchDedupes, switchToBatch} from "../shared/sharedBasics.testService";
import {screen} from "@testing-library/react";
import {Simulate} from "react-dom/test-utils";
import { click } from "../../test/domServices/click.testService";

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
    checkbox('all', false);
    checkbox(1, false);
}

function selectAll(){
    click('batch_selectAll');
    isDisabled('batch_selectAll');
    checkbox('all', true);
    checkbox(1, true);
}

function page2(){
    nextPage();
    checkbox(21, true);
}

function unselect(){
    click('batch_selectNone');
    checkbox('all', false);
    checkbox(21, false);
}

function pageOnly(){
    click('batch_selectPage');
    checkbox('all', false);
    checkbox(21, true);
}

function page3(){
    nextPage();
    checkbox(41, false);
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