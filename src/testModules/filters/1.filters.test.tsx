import React from "react";
import {renderMain} from "../shared/sharedBasics.testService";
import {testAs} from "../../test/apiCache/getData/getData.service";
import {checkSelectValue, clickByText, noTexts, texts} from "../../test/domServices/domUtils.testService";
import {fireEvent, screen} from "@testing-library/react";

const filterOptions = {
    operatingUnit: {contains: ['Rwanda'], notContains: ['Asia Region', 'Botswana']},
    dataType: {contains:['MER Targets', 'MER Results']},
    period: {contains:['Oct 2019 - Sep 2020', 'Oct 2020 - Sep 2021'], notContains: ['Oct 2018 - Sep 2019']},
    agency: {contains:['HHS/CDC','State/SGAC','USAID']},
    technicalArea: {contains:['AGYW','KP_MAT','LAB_PT_HIV']},
    // dedupeType: {contains:['Pure Dedupes', 'Crosswalk Dedupes']}
};

function generateFilterOptionsTest(filterType:string, options:{contains:string[], notContains:string[]}){
    let selectId = `filter_${filterType}`;
    fireEvent.mouseDown(screen.getByTestId(selectId).childNodes[0]);
    texts(options.contains);
    if (options.notContains) noTexts(options.notContains);
    let value = options.contains[0];
    clickByText(value);
    checkSelectValue(selectId, value);
}


test(`1 > Filters`, async ()=>{
    testAs('test-de-interAgency-rwanda');
    await renderMain();
    Object.keys(filterOptions).map(filterType=>generateFilterOptionsTest(filterType, filterOptions[filterType]));
});