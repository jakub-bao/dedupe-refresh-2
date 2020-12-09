import {DedupeTestCase} from "../shared/models/test.models";
import {ResolutionMethodType} from "../../modules/results/models/dedupe.model";
import {searchDedupes} from "../shared/sharedBasics.testService";

export const BotswanaAllCase:DedupeTestCase = {
    testAs: 'test-de-superAdmin',
    name: `Botswana > MER Results > 2020 Summer`,
    filters: {
        operatingUnit: 'Botswana',
        dataType: 'MER Results',
        period: 'Jul - Sep 2020',
        includeResolved: true
    },
    expectedTokens: [
        'OVC_HIVSTAT (N, DSD, ReportedStatus): OVC Disclosed Known HIV Status',
        'Kgatleng District',
        'STEPPING STONES INTERNATIONAL',
        'Project Concern International',
        'Sum (1191)'
    ],
    resolved: [{
        value:1191,
        method: ResolutionMethodType.sum
    },{
        value:309,
        method: ResolutionMethodType.sum
    }],
};

test('11 > Batch Select', async ()=>{
    await searchDedupes(BotswanaAllCase);
});