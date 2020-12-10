import {click, loadingDone, select, setUpComponent, texts} from "../../test/domServices/domUtils.testService";
import Main from "../../modules/main/components/main.component";
import React from "react";
import {testAs} from "../../test/apiCache/getData/getData.service";
import {DedupeTestCase} from "./models/test.models";
import {noTextIn, textIn} from "../../test/domServices/textsIn.testService";
import {exist, noExist} from "../../test/domServices/texts.testService";
import {fireEvent, screen} from "@testing-library/react";
import {InternalStatus} from "../../modules/results/models/dedupe.model";
import {SnackbarProvider} from "notistack";

export async function renderMain(){
    return await setUpComponent(<SnackbarProvider><Main/></SnackbarProvider>,[/*'Data Deduplication',*/'Include Resolved','Dedupe Type', 'Operating Unit *']);
}

export async function searchDedupes(testCase:DedupeTestCase){
    testAs(testCase.testAs);
    await renderMain();
    if (testCase.filters.crosswalk) select(`filter_dedupeType`,'Crosswalk Dedupes');
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
    noTextIn(`status_${index}`, 'Ready to resolve');
    click(`resolution_${index}_custom`);
    textIn(`status_${index}`, 'Ready to resolve');
    exist('resolution_custom_input');
}

export function checkStatus(index:number, status:InternalStatus){
    textIn(`status_${index}`, status);
}

function asInp(el:Element):HTMLInputElement{
    return el as HTMLInputElement;
}


export const checkCustomValue = (customValue:number)=>expect(asInp(screen.getByTestId('resolution_custom_input')).value).toBe(customValue.toString());

export const switchToBatch = ()=>{
    click('menu_tab_batch');
    texts(['Select everything']);
}

export const isDisabled = (id:string)=>expect(screen.getByTestId(id).hasAttribute('disabled')).toBeTruthy();

export const checkCheckbox = (id:number|string, value:boolean)=>{
    expect(screen.getByTestId(`batch_checkbox_${id}`).querySelector('input').checked).toEqual(value);
};

export const clickCheckbox = (id:number|string)=>{
    fireEvent.click(screen.getByTestId(`batch_checkbox_${id}`).querySelector('input'));
};

export const nextPage = ()=>fireEvent.click(document.querySelector('[title="Next Page"] button'));