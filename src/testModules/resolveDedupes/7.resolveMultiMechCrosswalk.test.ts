import {DedupeTestCase} from "../shared/models/test.models";
import {searchDedupes} from "../shared/sharedBasics.testService";
import {checkRadioValue, click} from "../../test/domServices/click.testService";
import {waitForTexts} from "../../test/domServices/domUtils.testService";
import {registerSendMock} from "../../test/apiCache/sendData/mockSendData.service";


const EthiopiaTest:DedupeTestCase = {
    testAs: 'test-de-superAdmin',
    name: `Ethiopia > MER Results > 2020 Q4`,
    filters: {
        operatingUnit: 'Ethiopia',
        dataType: 'MER Results',
        period: 'Oct - Dec 2020',
        includeResolved: true,
        crosswalk: true
    },
    expectedTokens: [
        'HTS_TST (N, TA, KeyPop/Result): HTS received results',
        'PWID, Positive',
        'Addis Ketema Woreda 1',
        'HHS/HRSA',
        'Unresolved','80020','80010','Sum (160030)','Maximum (80020)'
    ],
    resolved: null,
};

test(`7 > Resolve Multi-mech Crosswalk Dedupe > Ethiopia`, async ()=>{
    await searchDedupes(EthiopiaTest);
    click(`resolution_1_maximum`);
    registerSendMock('POST','/dataValues', {ok:true},(data:any)=>{
        expect(data).toBe('de=kt5rPumWUBE&co=xYyVHiXrvSi&ou=Dl0yK0OhftZ&pe=2020Q4&value=-80010&cc=wUpfppgjEza&cp=OM58NubPbx1');
    });
    click(`dedupe_1_resolve`);
    await waitForTexts(['Resolved','Resolved on server']);
    checkRadioValue(`resolution_1`, 'maximum');
});