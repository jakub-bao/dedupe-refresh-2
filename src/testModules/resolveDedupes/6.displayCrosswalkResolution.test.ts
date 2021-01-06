import sqlResponse from "./6.displayCrosswalkResolution.testData.json";
import {registerGetMock} from "../../test/apiCache/getData/getMock.service";
import {searchDedupes} from "../shared/sharedBasics.testService";
import {noTexts} from "../../test/domServices/texts.testService";
import {DedupeTestCase} from "../shared/models/test.models";
import {ResolutionMethodType} from "../../modules/results/models/dedupe.model";
import {FilterDedupeStatus} from "../../modules/menu/models/filters.model";

export const CameroonTestCase:DedupeTestCase = {
    testAs: 'test-de-superAdmin',
    name: `Cameroon > MER Results > 2020 Q4`,
    filters: {
        operatingUnit: 'Cameroon',
        dataType: 'MER Results',
        period: 'Oct - Dec 2020',
        status: FilterDedupeStatus.resolvedAndUnresolved,
        crosswalk: true
    },
    expectedTokens: [
        'VMMC_CIRC (N, TA, Age/Sex/HIVStatus): Voluntary Circumcised',
        '20-24, Positive, Male',
        'CMA de Songkolong',
        'HHS/CDC',
        'Resolved on server','70020','70010','Sum (140030)','Maximum (70020)'
    ],
    resolved: [{
        value:70080,
        method: ResolutionMethodType.custom
    }],
};

test(`6 > Display Crosswalk Resolution`, async()=>{
    registerGetMock('/sqlViews/wzpSd6j89wc/data?paging=false&var=ou:bQQJe0cC1eD&var=dt:RESULTS&var=pe:2020Q4&var=ty:CROSSWALK&var=rs:true&var=ps:100000&var=pg:1&var=ag:NONE&var=dg:NONE', sqlResponse);
    await searchDedupes(CameroonTestCase);
    noTexts(['Dedupe adjustments Agency','Dedupe adjustment']);
});