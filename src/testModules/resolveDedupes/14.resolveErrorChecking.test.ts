import {checkStatus, searchDedupes} from "../shared/sharedBasics.testService";
import {click} from "../../test/domServices/click.testService";
import {text, waitForTexts} from "../../test/domServices/texts.testService";
import {DedupeTestCase} from "../shared/models/test.models";
import {FilterDedupeStatus} from "../../modules/menu/models/filters.model";
import {registerSendMock} from "../../test/apiCache/sendData/mockSendData.service";
import {InternalStatus} from "../../modules/results/models/dedupe.model";

export const BotswanaTestCase:DedupeTestCase = {
    testAs: 'test-de-superAdmin',
    name: `Botswana > MER Results > 2020 Q4`,
    filters: {
        operatingUnit: 'Botswana',
        dataType: 'MER Results',
        period: 'Oct - Dec 2020',
        status: FilterDedupeStatus.resolvedAndUnresolved
    },
    expectedTokens: [
        'HTS_TST (N, DSD, KeyPop/Result): HTS received results',
        'PWID, Positive',
        'Bobirwa District',
        'HHS/CDC',
        '60030','60020','60010','Sum (180060)','Maximum (60030)'
    ],
    resolved: null,
};

test(`14 > Resolve Error Checking`, async ()=>{
    await searchDedupes(BotswanaTestCase);
    registerSendMock('POST','/dataValues', {ok:false},(data:any)=>{});
    click('resolution_1_maximum');
    click(`dedupe_1_resolve`);
    text('Processing...');
    await waitForTexts(['Error resolving dedupe']);
    checkStatus(1, "Ready to resolve");
});