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
    dataType: string,
    period: string,
    agency: string,
    technicalArea: string,
    dedupeType: string,
    includeResolved: boolean
}