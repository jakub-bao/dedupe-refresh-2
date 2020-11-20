import {click, loadingDone, select, setUpComponent, text, texts} from "../../test/domServices/domUtils.testService";
import Main from "../../modules/main/components/main.component";
import React from "react";
import {testAs} from "../../test/apiCache/getData/getData.service";
import {DedupeTestCase} from "./models/test.models";
import {noTextIn, textIn} from "../../test/domServices/textsIn.testService";
import {exist, noExist} from "../../test/domServices/texts.testService";

export async function renderMain(){
    return await setUpComponent(<Main/>,['Data Deduplication','Include Resolved','Dedupe Type', 'Operating Unit *']);
}

export async function searchDedupes(testCase:DedupeTestCase){
    testAs(testCase.testAs);
    await renderMain();
    ['operatingUnit','dataType','period'].forEach((filter:string)=>{
        select(`filter_${filter}`,testCase.filters[filter]);
    });
    if (testCase.filters.includeResolved) click('filter_includeResolved');
    click('searchDedupes');
    await loadingDone();
    texts(testCase.expectedTokens);
}

export function switchToCustom(index:number){
    noExist('resolution_custom_input');
    noTextIn('status_0', 'unsaved');
    click('resolution_0_custom');
    textIn('status_0', 'unsaved');
    exist('resolution_custom_input');
}