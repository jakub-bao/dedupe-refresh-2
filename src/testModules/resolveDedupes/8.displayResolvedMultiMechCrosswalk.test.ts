import sqlResponse from "./8.displayResolvedMultiMechCrosswalk.testData.json";
import {registerGetMock} from "../../test/apiCache/getData/getMock.service";
import {checkCustomValue, searchDedupes, switchToCustom} from "../shared/sharedBasics.testService";
import {checkRadioValue, click, type} from "../../test/domServices/click.testService";
import {registerSendMock} from "../../test/apiCache/sendData/mockSendData.service";
import {noTexts, waitForTexts} from "../../test/domServices/texts.testService";
import {DedupeTestCase} from "../shared/models/test.models";
import {ResolutionMethodType} from "../../modules/results/models/dedupe.model";

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
        'resolved','80020','80010','Sum (160030)','Maximum (80020)'
    ],
    resolved: null
};

test(`8 > Display Multi-mech Crosswalk Resolution`, async()=>{
    registerGetMock('/sqlViews/wzpSd6j89wc/data?paging=false&var=ou:IH1kchw86uA&var=dt:RESULTS&var=pe:2020Q4&var=ty:CROSSWALK&var=rs:true&var=ps:100000&var=pg:1&var=ag:NONE&var=dg:NONE', sqlResponse);
    await searchDedupes(EthiopiaTest);
    noTexts(['Dedupe adjustments Agency','Dedupe adjustment']);
    checkRadioValue(`resolution_1`, 'maximum');
});