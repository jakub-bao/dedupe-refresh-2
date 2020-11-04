export type TestFilters = {
    organisationUnit: string;
    dataType: string;
    period: string;
    includeResolved: boolean
};

export type RdTestCase = {
    name: string;
    testAs: string;
    filters: TestFilters;
    expectedTokens: string[];
};

const Rwanda1:RdTestCase = {
    testAs: 'test-de-interAgency-rwanda',
    name: `Rwanda > MER Results > 2020 Q2`,
    filters: {
        organisationUnit: 'Rwanda',
        dataType: 'MER Results',
        period: 'Apr - Jun 2020',
        includeResolved: false
    },
    expectedTokens: ['HTS_TST (N, DSD, KeyPop/Result): HTS received results','PWID, Negative','Gashora Sector','USAID','Cooperative Housing Foundation Corp.','17616','10040','10020','10030','10010','Maximum (10040)','Sum (20060)']
};

const Nigeria1:RdTestCase = {
    testAs: 'test-de-interAgency-nigeria',
    name: `Nigeria > MER Results > 2020 Q2`,
    filters: {
        organisationUnit: 'Nigeria',
        dataType: 'MER Results',
        period: 'Apr - Jun 2020',
        includeResolved: true
    },
    expectedTokens: ['HTS_TST (N, DSD, KeyPop/Result): HTS received results','People in prisons and other enclosed settings, Positive','ad Demsa','HHS/CDC','CATHOLIC CARITAS FOUNDATION O F NIGERIA','16848','30010','10020','20010','20020','Maximum (30020)','Sum (40030)']
};

export const rdTestCases:RdTestCase[] = [Rwanda1];