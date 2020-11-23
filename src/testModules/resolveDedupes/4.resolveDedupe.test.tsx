import {DedupeTestCase} from "../shared/models/test.models";
import {checkCustomValue, checkStatus, searchDedupes, switchToCustom} from "../shared/sharedBasics.testService";
import {click, type} from "../../test/domServices/click.testService";
import {InternalStatus} from "../../modules/results/models/dedupe.model";
import {waitForTexts} from "../../test/domServices/domUtils.testService";

const BotswanaTestCase:DedupeTestCase = {
    testAs: 'test-de-superAdmin',
    name: `Botswana > MER Results > 2020 Q4`,
    filters: {
        operatingUnit: 'Botswana',
        dataType: 'MER Results',
        period: 'Oct - Dec 2020',
        includeResolved: true
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


test(`4 > Resolve Dedupes > Botswana > Cancel`, async ()=>{
    await searchDedupes(BotswanaTestCase);
    switchToCustom(1);
    checkCustomValue(60010)
    await type('resolution_custom_input', '60020');
    checkCustomValue(60020)
    click(`dedupe_1_cancel`);
    checkStatus(1,InternalStatus.pending);
});

test(`4 > Resolve Dedupes > Botswana > Submit`, async ()=>{
    await searchDedupes(BotswanaTestCase);
    switchToCustom(1);
    checkCustomValue(60010)
    await type('resolution_custom_input', '60020');
    checkCustomValue(60020);
    click(`dedupe_1_save`);
    // checkStatus(1,InternalStatus.pending);
    await waitForTexts(['resolved']);
    checkCustomValue(60020);
});