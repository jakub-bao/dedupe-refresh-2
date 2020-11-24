import {DedupeTestCase} from "../shared/models/test.models";
import {checkCustomValue, checkStatus, searchDedupes, switchToCustom} from "../shared/sharedBasics.testService";
import {click, type} from "../../test/domServices/click.testService";
import {InternalStatus} from "../../modules/results/models/dedupe.model";
import {waitForTexts} from "../../test/domServices/domUtils.testService";
import {registerSendMock} from "../../test/apiCache/sendData/mockSendData.service";


const CameroonTestCase:DedupeTestCase = {
    testAs: 'test-de-superAdmin',
    name: `Cameroon > MER Results > 2020 Q4`,
    filters: {
        operatingUnit: 'Cameroon',
        dataType: 'MER Results',
        period: 'Oct - Dec 2020',
        includeResolved: true,
        crosswalk: true
    },
    expectedTokens: [
        'VMMC_CIRC (N, TA, Age/Sex/HIVStatus): Voluntary Circumcised',
        '20-24, Positive, Male',
        'CMA de Songkolong',
        'HHS/CDC',
        'pending','70020','70010','Sum (140030)','Maximum (70020)'
    ],
    resolved: null,
};

test(`5 > Resolve Crosswalk Dedupes > Cameroon`, async ()=>{
    await searchDedupes(CameroonTestCase);
    switchToCustom(1);
    checkCustomValue(70010)
    await type('resolution_custom_input', '70080');
    checkCustomValue(70080);
    registerSendMock('POST','/dataValues', {ok:true},(data:any)=>{
        expect(data).toBe('de=TiMvlchPiPH&co=pWaGXt8b4rt&ou=Qxqy3OnMtLi&pe=2020Q4&value=-69950&cc=wUpfppgjEza&cp=OM58NubPbx1');
    });
    click(`dedupe_1_save`);
    await waitForTexts(['Saved','resolved']);
    checkCustomValue(70080);
});