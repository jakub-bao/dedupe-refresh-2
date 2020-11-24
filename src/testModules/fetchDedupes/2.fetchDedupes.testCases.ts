import {DataType, DedupeType, FiltersModel} from "../../modules/filters/models/filters.model";
import {DedupeModel, InternalStatus, ResolutionMethodType} from "../../modules/results/models/dedupe.model";

export type FdTestCase = {
    name:string;
    testAs: string;
    selectedFilters:FiltersModel;
    dedupes: DedupeModel[];
};

const RwandaResults2020Q4:FdTestCase = {
    testAs: 'test-de-interAgency-rwanda',
    name: `Rwanda > MER Results > 2020 Q2`,
    selectedFilters: {
        operatingUnit: 'XtxUYCsDWrR', //Rwanda
        dataType: DataType.results,
        period: '2020Q4',
        agency: null,
        technicalArea: null,
        dedupeType: DedupeType.pure,
        includeResolved: false
    },
    dedupes: [{
        status: InternalStatus.pending,
        "meta": {"periodId":"2020Q4", "orgUnitId": "TAPALAZae2l", "internalId":1,"dedupeType": DedupeType.pure},
        "data": {
            "dataElementId": "qhGxKnmrZBd",
            "disAggregation": "PWID, Negative",
            "categoryOptionComboId": "nEKvoyX7K7X"
        },
        "info": {
            "orgUnitName": "Gashora Sector",
            "dataElementName": "HTS_TST (N, DSD, KeyPop/Result): HTS received results"
        },
        "resolution": {"resolutionMethodValue": null, "original_resolutionMethodValue": null, "availableValues": {"sum": 20060, "maximum": 10040,"minimum":10020}},
        "duplicates": [{
            "value": 10040,
            "agencyName": "USAID",
            "partnerName": "Cooperative Housing Foundation Corp.",
            "mechanismNumber": "17616"
        }, {"value": 10020, "agencyName": "USAID", "partnerName": "Caritas Rwanda Asbl", "mechanismNumber": "16858"}]
    }, {
        status: InternalStatus.pending,
        "meta": {"periodId":"2020Q4", "orgUnitId": "TAPALAZae2l", "internalId":2,"dedupeType": DedupeType.pure},
        "data": {
            "dataElementId": "qhGxKnmrZBd",
            "disAggregation": "PWID, Positive",
            "categoryOptionComboId": "xYyVHiXrvSi"
        },
        "info": {
            "orgUnitName": "Gashora Sector",
            "dataElementName": "HTS_TST (N, DSD, KeyPop/Result): HTS received results"
        },
        "resolution": {"resolutionMethodValue": null, "original_resolutionMethodValue": null, "availableValues": {"sum": 20040, "maximum": 10030,"minimum":10010}},
        "duplicates": [{
            "value": 10030,
            "agencyName": "USAID",
            "partnerName": "Cooperative Housing Foundation Corp.",
            "mechanismNumber": "17616"
        }, {"value": 10010, "agencyName": "USAID", "partnerName": "Caritas Rwanda Asbl", "mechanismNumber": "16858"}]
    }]
};

const Nigeria1:FdTestCase = {
    testAs: 'test-de-interAgency-nigeria',
    name: `Nigeria > MER Results > 2020 Q2`,
    selectedFilters: {
        operatingUnit: 'PqlFzhuPcF1', //Rwanda
        dataType: DataType.results,
        period: '2020Q4',
        agency: null,
        technicalArea: null,
        dedupeType: DedupeType.pure,
        includeResolved: true
    },
    dedupes: [{
        status: InternalStatus.resolved,
        "meta": {"periodId":"2020Q4", "orgUnitId": "p7M264Wg1qB", "internalId":1, "dedupeType": DedupeType.pure},
        "data": {
            "dataElementId": "qhGxKnmrZBd",
            "disAggregation": "People in prisons and other enclosed settings, Positive",
            "categoryOptionComboId": "NMYN9FAPqWa"
        },
        "info": {"orgUnitName": "ad Demsa", "dataElementName": "HTS_TST (N, DSD, KeyPop/Result): HTS received results"},
        "resolution": {
            "resolutionMethodValue": {
                "resolutionValue": 30020,
                "resolutionMethod": ResolutionMethodType.maximum,
                "deduplicationAdjustmentValue": -30010
            },
            "original_resolutionMethodValue": {
                "resolutionValue": 30020,
                "resolutionMethod": ResolutionMethodType.maximum,
                "deduplicationAdjustmentValue": -30010
            }, "availableValues": {"sum": 60030, "maximum": 30020,"minimum":30010}
        },
        "duplicates": [{
            "value": 30010,
            "agencyName": "HHS/CDC",
            "partnerName": "CATHOLIC CARITAS FOUNDATION O F NIGERIA",
            "mechanismNumber": "16848"
        }, {
            "value": 30020,
            "agencyName": "HHS/CDC",
            "partnerName": "APIN PUBLIC HEALTH INITIATIVE S LTD/GTE",
            "mechanismNumber": "16850"
        }]
    }, {
        status: InternalStatus.resolved,
        "meta": {"periodId":"2020Q4", "orgUnitId": "BY7bSKwPjPJ", "internalId":2, "dedupeType": DedupeType.pure},
        "data": {
            "dataElementId": "FI2s716RRZc",
            "disAggregation": "PWID, Recent RTRI, Positive",
            "categoryOptionComboId": "inrjeyWelOD"
        },
        "info": {
            "orgUnitName": "ab Aba North",
            "dataElementName": "HTS_RECENT (N, DSD, KeyPop/RTRI/HIVStatus): HIV recency test"
        },
        "resolution": {
            "resolutionMethodValue": {
                "resolutionValue": 40030,
                "resolutionMethod": ResolutionMethodType.sum,
                "deduplicationAdjustmentValue": 0
            }, "original_resolutionMethodValue": {
                "resolutionValue": 40030,
                "resolutionMethod": ResolutionMethodType.sum,
                "deduplicationAdjustmentValue": 0
            },  "availableValues": {"sum": 40030, "maximum": 20020,"minimum":20010}
        },
        "duplicates": [{
            "value": 20010,
            "agencyName": "USAID",
            "partnerName": "Abt Associates Inc.",
            "mechanismNumber": "14169"
        }, {
            "value": 20020,
            "agencyName": "USAID",
            "partnerName": "JSI Research And Training Institute, INC.",
            "mechanismNumber": "14302"
        }]
    }]
};

export const testCases:FdTestCase[] = [RwandaResults2020Q4,Nigeria1];