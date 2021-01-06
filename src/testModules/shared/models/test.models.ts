import {ResolutionMethodType} from "../../../modules/results/models/dedupe.model";
import {FilterDedupeStatus} from "../../../modules/menu/models/filters.model";

export type TestFilters = {
    operatingUnit: string;
    dataType: string;
    period: string;
    status: FilterDedupeStatus;
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