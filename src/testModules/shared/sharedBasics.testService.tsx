import {click, loadingDone, select, setUpComponent, texts} from "../../test/domServices/domUtils.testService";
import Main from "../../modules/main/components/main.component";
import React from "react";
import {testAs} from "../../test/apiCache/getData/getData.service";
import {DedupeTestCase} from "./models/test.models";

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