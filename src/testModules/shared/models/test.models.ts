import {ResolutionMethodType} from "../../../modules/results/models/dedupe.model";

export type TestFilters = {
    operatingUnit: string;
    dataType: string;
    period: string;
    includeResolved: boolean;
    crosswalk?:boolean;
};

export type TestResolution = {
    value: number;
    method: ResolutionMethodType;
};

export type DedupeTestCase = {
    name: string;
    testAs: string;
    filters: TestFilters;
    expectedTokens: string[];
    resolved: TestResolution[];
};