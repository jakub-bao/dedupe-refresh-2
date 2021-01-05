export enum DataType{
    results='RESULTS',
    targets='TARGETS'
}

export enum DedupeType{
    pure='PURE',
    crosswalk='CROSSWALK'
}

export enum FilterType {
    operatingUnit = 'operatingUnit',
    dataType='dataType',
    period='period',
    agency='agency',
    technicalArea='technicalArea',
    dedupeType='dedupeType',
    status='status'
}

export enum FilterDedupeStatus{
    unresolved='unresolved',
    resolvedAndUnresolved='resolvedAndUnresolved'
}

export type FiltersModel = {
    operatingUnit: string,
    dataType: DataType,
    period: string,
    agency: string,
    technicalArea: string,
    dedupeType: DedupeType,
    status: FilterDedupeStatus
}