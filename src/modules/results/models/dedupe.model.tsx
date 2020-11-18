
export type DedupeMetaModel = {
    orgUnitId: string;
    internalId: number;
}

export type DedupeDataModel = {
    dataElementId: string;
    disAggregation: string;
    categoryOptionComboId: string;
}

export type DedupeInfoModel = {
    orgUnitName: string;
    dataElementName: string;
}

export enum ResolutionMethodType {
    maximum= 'maximum',
    sum = 'sum',
    custom = 'custom'
}

export type DedupeResolutionMethodValue = {
    resolutionMethod: ResolutionMethodType;
    resolutionValue: number;
    deduplicationAdjustmentValue: number;
}

export type DedupeResolutionAvailableValues = {
    maximum: number;
    sum: number;
    minimum?: number;
};

export type DedupeResolutionModel = {
    resolutionMethodValue: DedupeResolutionMethodValue;
    original_resolutionMethodValue: DedupeResolutionMethodValue;
    availableValues: DedupeResolutionAvailableValues;
}

export type DuplicateModel = {
    value: number;
    agencyName: string;
    partnerName: string;
    mechanismNumber: number;
}

export enum InternalStatus{
    pending='pending',
    localChanges='localChanges',
    resolved='resolved',
};


export class DedupeModel {
    meta: DedupeMetaModel;
    data: DedupeDataModel;
    info: DedupeInfoModel;
    resolution: DedupeResolutionModel;
    duplicates: DuplicateModel[];
    status: ()=>InternalStatus;
}