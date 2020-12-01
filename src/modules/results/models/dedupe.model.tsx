import {DedupeType} from "../../filters/models/filters.model";

export type DedupeMetaModel = {
    orgUnitId: string;
    internalId: number;
    periodId: string;
    dedupeType: DedupeType
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
    mechanismNumber: string;

}

export enum InternalStatus{
    unresolved='unresolved',
    readyToResolve='readyToResolve',
    resolvedOnServer='resolvedOnServer',
};


export type DedupeModel = {
    meta: DedupeMetaModel;
    data: DedupeDataModel;
    info: DedupeInfoModel;
    resolution: DedupeResolutionModel;
    duplicates: DuplicateModel[];
    status: InternalStatus;
}

function compareResolutions(resolution1:DedupeResolutionMethodValue, resolution2:DedupeResolutionMethodValue):boolean{
    if (!resolution2) return false;
    return resolution1.resolutionMethod===resolution2.resolutionMethod
    && resolution1.deduplicationAdjustmentValue===resolution2.deduplicationAdjustmentValue
    && resolution1.resolutionValue===resolution2.resolutionValue;
}

function getDedupeStatus(dedupe:DedupeModel):InternalStatus{
    if (!dedupe.resolution || !dedupe.resolution.resolutionMethodValue) return InternalStatus.unresolved;
    if (!compareResolutions(dedupe.resolution.resolutionMethodValue, dedupe.resolution.original_resolutionMethodValue)) return InternalStatus.readyToResolve;
    if (dedupe.resolution.resolutionMethodValue && dedupe.resolution.resolutionMethodValue.deduplicationAdjustmentValue!==null) return InternalStatus.resolvedOnServer;
}

export function updateStatus(dedupe:DedupeModel):void{
    dedupe.status = getDedupeStatus(dedupe);
}