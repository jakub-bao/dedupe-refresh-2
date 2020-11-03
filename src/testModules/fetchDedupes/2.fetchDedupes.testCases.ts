import {FiltersModel} from "../../modules/filters/models/filters.model";
import {DedupeModel} from "../../modules/results/models/dedupe.model";

export type FdTestCase = {
    name:string;
    testAs: string;
    selectedFilters:FiltersModel;
    dedupes: DedupeModel[];
};

const Rwanda1:FdTestCase = {
    testAs: 'test-de-interAgency-rwanda',
    name: `Rwanda > MER Results > 2020 Q2`,
    selectedFilters: {
        organisationUnit: 'XtxUYCsDWrR', //Rwanda
        dataType: 'RESULTS',
        period: '2020Q2',
        agency: null,
        technicalArea: null,
        dedupeType: 'PURE',
        includeResolved: false
    },
    dedupes: [{"meta":{"orgUnitId":"TAPALAZae2l","periodId":"blank","dataType":"blank"},"data":{"dataElementId":"qhGxKnmrZBd","disAggregation":"PWID, Negative","categoryOptionComboId":"nEKvoyX7K7X"},"info":{"orgUnitName":"Gashora Sector","dataElementName":"HTS_TST (N, DSD, KeyPop/Result): HTS received results"},"resolution":{"resolvedBy":null,"isResolved":false,"availableValues":{"sum":20060,"max":10040}},"duplicates":[{"value":10040,"agencyName":"USAID","partnerName":"Cooperative Housing Foundation Corp.","mechanismNumber":17616},{"value":10020,"agencyName":"USAID","partnerName":"Caritas Rwanda Asbl","mechanismNumber":16858}]},{"meta":{"orgUnitId":"TAPALAZae2l","periodId":"blank","dataType":"blank"},"data":{"dataElementId":"qhGxKnmrZBd","disAggregation":"PWID, Positive","categoryOptionComboId":"xYyVHiXrvSi"},"info":{"orgUnitName":"Gashora Sector","dataElementName":"HTS_TST (N, DSD, KeyPop/Result): HTS received results"},"resolution":{"resolvedBy":null,"isResolved":false,"availableValues":{"sum":20040,"max":10030}},"duplicates":[{"value":10030,"agencyName":"USAID","partnerName":"Cooperative Housing Foundation Corp.","mechanismNumber":17616},{"value":10010,"agencyName":"USAID","partnerName":"Caritas Rwanda Asbl","mechanismNumber":16858}]}]
};
const Nigeria1:FdTestCase = {
    testAs: 'test-de-interAgency-nigeria',
    name: `Nigeria > MER Results > 2020 Q2`,
    selectedFilters: {
        organisationUnit: 'PqlFzhuPcF1', //Rwanda
        dataType: 'RESULTS',
        period: '2020Q2',
        agency: null,
        technicalArea: null,
        dedupeType: 'PURE',
        includeResolved: true
    },
    dedupes: [{"meta":{"orgUnitId":"p7M264Wg1qB","periodId":"blank","dataType":"blank"},"data":{"dataElementId":"qhGxKnmrZBd","disAggregation":"People in prisons and other enclosed settings, Positive","categoryOptionComboId":"NMYN9FAPqWa"},"info":{"orgUnitName":"ad Demsa","dataElementName":"HTS_TST (N, DSD, KeyPop/Result): HTS received results"},"resolution":{"resolvedBy":{"resolutionValue":30020,"resolutionMethod":"maximum","deduplicationAdjustmentValue":-30010},"isResolved":true,"availableValues":{"sum":60030,"max":30020}},"duplicates":[{"value":30010,"agencyName":"HHS/CDC","partnerName":"CATHOLIC CARITAS FOUNDATION O F NIGERIA","mechanismNumber":16848},{"value":30020,"agencyName":"HHS/CDC","partnerName":"APIN PUBLIC HEALTH INITIATIVE S LTD/GTE","mechanismNumber":16850},{"value":-30010,"agencyName":"Dedupe adjustments Agency","partnerName":"Dedupe adjustment","mechanismNumber":0}]},{"meta":{"orgUnitId":"BY7bSKwPjPJ","periodId":"blank","dataType":"blank"},"data":{"dataElementId":"FI2s716RRZc","disAggregation":"PWID, Recent RTRI, Positive","categoryOptionComboId":"inrjeyWelOD"},"info":{"orgUnitName":"ab Aba North","dataElementName":"HTS_RECENT (N, DSD, KeyPop/RTRI/HIVStatus): HIV recency test"},"resolution":{"resolvedBy":{"resolutionValue":40030,"resolutionMethod":"sum","deduplicationAdjustmentValue":0},"isResolved":true,"availableValues":{"sum":40030,"max":20020}},"duplicates":[{"value":20010,"agencyName":"USAID","partnerName":"Abt Associates Inc.","mechanismNumber":14169},{"value":20020,"agencyName":"USAID","partnerName":"JSI Research And Training Institute, INC.","mechanismNumber":14302},{"value":0,"agencyName":"Dedupe adjustments Agency","partnerName":"Dedupe adjustment","mechanismNumber":0}]}]
};

export const testCases:FdTestCase[] = [Rwanda1,Nigeria1];