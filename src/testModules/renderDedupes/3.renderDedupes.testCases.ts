import {ResolutionMethodType} from "../../modules/results/models/dedupe.model";
import {DedupeTestCase} from "../shared/models/test.models";
import {FilterDedupeStatus} from "../../modules/menu/models/filters.model";

export const Rwanda1:DedupeTestCase = {
    testAs: 'test-de-interAgency-rwanda',
    name: `Rwanda > MER Results > 2020 Q4`,
    filters: {
        operatingUnit: 'Rwanda',
        dataType: 'MER Results',
        period: 'Oct - Dec 2020',
        status: FilterDedupeStatus.unresolved
    },
    expectedTokens: ['HTS_TST (N, DSD, KeyPop/Result): HTS received results'/*,'PWID, Negative'*/,'Gashora Sector','USAID','Cooperative Housing Foundation Corp.','17616','10040','10020','10030','10010','(10040)','(20060)'],
    resolved: null,
};

export const Nigeria1:DedupeTestCase = {
    testAs: 'test-de-interAgency-nigeria',
    name: `Nigeria > MER Results > 2020 Q4`,
    filters: {
        operatingUnit: 'Nigeria',
        dataType: 'MER Results',
        period: 'Oct - Dec 2020',
        status: FilterDedupeStatus.resolvedAndUnresolved
    },
    expectedTokens: ['HTS_TST (N, DSD, KeyPop/Result): HTS received results','People in prisons and other enclosed settings, Positive','ad Demsa','HHS/CDC','CATHOLIC CARITAS FOUNDATION O F NIGERIA','16848','30010','20010','20020','(30020)','(40030)'],
    resolved:[{
        value:30020,
        method: ResolutionMethodType.maximum
    },{
        value:40030,
        method: ResolutionMethodType.sum
    }],
};

export const rdTestCases:DedupeTestCase[] = [Rwanda1,Nigeria1];