import {DedupeTestCase} from "../shared/models/test.models";
import {checkCustomValue, searchDedupes, switchToCustom} from "../shared/sharedBasics.testService";
import {click, type} from "../../test/domServices/click.testService";
import {text, waitForTexts} from "../../test/domServices/domUtils.testService";
import {registerSendMock} from "../../test/apiCache/sendData/mockSendData.service";

//delete data: env-load-dhis jakub && dhis_api -a "dataValues.json?de=qhGxKnmrZBd&co=xYyVHiXrvSi&ou=gGqaAXuUGpb&pe=2020Q4&cc=wUpfppgjEza&cp=xEzelmtHWPn" -X DELETE

export const BotswanaTestCase:DedupeTestCase = {
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

test(`4 > Resolve Dedupes > Botswana > Submit`, async ()=>{
    // await deleteData('/dataValues?de=qhGxKnmrZBd&co=xYyVHiXrvSi&ou=gGqaAXuUGpb&pe=2020Q4&value=0&cc=wUpfppgjEza&cp=xEzelmtHWPn');
    await searchDedupes(BotswanaTestCase);
    switchToCustom(1);
    checkCustomValue(60030)
    await type('resolution_custom_input', '60040');
    checkCustomValue(60040);
    registerSendMock('POST','/dataValues', {ok:true},(data:any)=>{
        expect(data).toBe('de=qhGxKnmrZBd&co=xYyVHiXrvSi&ou=gGqaAXuUGpb&pe=2020Q4&value=-120020&cc=wUpfppgjEza&cp=xEzelmtHWPn');
    });
    click(`dedupe_1_resolve`);
    text('Processing...');
    await waitForTexts(['Resolved','Resolved on server']);
    checkCustomValue(60040);
});