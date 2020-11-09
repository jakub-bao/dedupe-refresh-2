export enum DataType{
    results='RESULTS',
    targets='TARGETS'
}

export enum DedupeType{
    pure='PURE',
    crosswalk='CROSSWALK'
}

export enum FilterType {
    organisationUnit = 'organisationUnit',
    dataType='dataType',
    period='period',
    agency='agency',
    technicalArea='technicalArea',
    dedupeType='dedupeType',
    includeResolved='includeResolved'
}

export type FiltersModel = {
    organisationUnit: string,
    dataType: DataType,
    period: string,
    agency: string,
    technicalArea: string,
    dedupeType: DedupeType,
    includeResolved: boolean
}