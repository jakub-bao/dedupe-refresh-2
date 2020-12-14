import {searchDedupes, switchToBatch} from "../shared/sharedBasics.testService";
import {Rwanda1} from "../renderDedupes/3.renderDedupes.testCases";
import {checkboxValue, checkRadioValue, click} from "../../test/domServices/click.testService";
import {textIn, textsIn} from "../../test/domServices/textsIn.testService";
import {registerSendMock} from "../../test/apiCache/sendData/mockSendData.service";

import resolveRwanda from "./13.batchResolveRequest.json";
import {text, waitForTexts} from "../../test/domServices/texts.testService";

let response  = {"responseType":"ImportSummary","status":"SUCCESS","importOptions":{"idSchemes":{},"dryRun":false,"preheatCache":false,"async":false,"importStrategy":"CREATE_AND_UPDATE","mergeMode":"REPLACE","reportMode":"FULL","skipExistingCheck":false,"sharing":false,"skipNotifications":false,"skipAudit":false,"datasetAllowsPeriods":false,"strictPeriods":false,"strictDataElements":false,"strictCategoryOptionCombos":false,"strictAttributeOptionCombos":false,"strictOrganisationUnits":false,"requireCategoryOptionCombo":false,"requireAttributeOptionCombo":false,"skipPatternValidation":false,"ignoreEmptyCollection":false,"force":false,"firstRowIsHeader":true,"skipLastUpdated":false},"description":"Import process completed successfully","importCount":{"imported":2,"updated":0,"ignored":0,"deleted":0},"dataSetComplete":"false"};

test(`13 > Unresolved to max`,async ()=>{
    await searchDedupes(Rwanda1);
    switchToBatch();
    click('batch_selectAll');
    textsIn('batch_stats',['2 out of 2 selected','2 unresolved']);
    click('batch_method_max');
    textsIn('batch_stats',['2 out of 2 selected','2 ready to resolve']);
    textIn('status_1','Ready to resolve');
    textIn('status_2','Ready to resolve');
    checkRadioValue(`resolution_1`, 'maximum');
    checkRadioValue(`resolution_2`, 'maximum');
    registerSendMock('POST','/dataValueSets',response,(body:any)=>{
        expect(body).toStrictEqual(resolveRwanda);
    });
    click('batch_action_resolve');
    await waitForTexts(['Batch processed']);
});