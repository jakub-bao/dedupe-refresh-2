import {
    DedupeModel,
    DedupeResolutionAvailableValues,
    DedupeResolutionModel,
    DedupeResolvedByModel,
    DuplicateModel,
    ResolutionMethodType
} from "../models/dedupe.model";
import {FiltersModel} from "../../filters/models/filters.model";
import {getData} from "../../../sharedModules/shared/services/api.service";

function generateDedupeUrl(selectedFilters:FiltersModel):string{
    return `/sqlViews/wzpSd6j89wc/data?paging=false`
        + `&var=ou:${selectedFilters.operatingUnit}`
        + `&var=dt:${selectedFilters.dataType}`
        + `&var=pe:${selectedFilters.period}`
        + `&var=ty:${selectedFilters.dedupeType||'PURE'}`
        + `&var=rs:${selectedFilters.includeResolved||false}`
        + `&var=ps:100000`
        + `&var=pg:1`
        + `&var=ag:${selectedFilters.agency||'NONE'}`
        + `&var=dg:${selectedFilters.technicalArea||'NONE'}`;
}

function extractDuplicates(rows:namedRow[]):DuplicateModel[]{
    return rows.filter(namedRow=>namedRow.mechanismNumber!==0).map(namedRow=>{
        return {
            value: namedRow.value,
            agencyName: namedRow.agencyName,
            partnerName: namedRow.partnerName,
            mechanismNumber: namedRow.mechanismNumber
        }
    })
}

function isDedupeFilter(namedRow:namedRow){
    return namedRow.partnerName==='Dedupe adjustment';
}

function getResolvedBy(selectedRows:namedRow[], availableValues:DedupeResolutionAvailableValues):DedupeResolvedByModel{
    const dedupeAdjustmentEntry = selectedRows.filter(isDedupeFilter)[0].value;
    const resolutionValue = selectedRows.map(record=>record.value).reduce((a,b)=>a+b,0);
    if (dedupeAdjustmentEntry===0) return {
        resolutionValue: resolutionValue,
        resolutionMethod: ResolutionMethodType.sum,
        deduplicationAdjustmentValue: dedupeAdjustmentEntry
    }
    if (resolutionValue===availableValues.max) return {
        resolutionValue: resolutionValue,
        resolutionMethod: ResolutionMethodType.maximum,
        deduplicationAdjustmentValue: dedupeAdjustmentEntry
    }
    return {
        resolutionValue: resolutionValue,
        resolutionMethod: ResolutionMethodType.custom,
        deduplicationAdjustmentValue: dedupeAdjustmentEntry
    }
}

function getAvailableValues(selectedRows:namedRow[]):DedupeResolutionAvailableValues{
    const enteredValues = selectedRows.filter(record=>record.value>=0).map(record=>record.value);
    return {
        sum: enteredValues.reduce((a,b)=>a+b,0),
        max: Math.max(...enteredValues)
    };
}

function getResolutionDetails(selectedRows: namedRow[]):DedupeResolutionModel{
    const isResolved = selectedRows[0].duplicateStatus==='RESOLVED';
    let resolution:DedupeResolutionModel = {
        resolvedBy: null,
        isResolved: isResolved,
        availableValues: getAvailableValues(selectedRows)
    };
    if (resolution.isResolved) resolution.resolvedBy = getResolvedBy(selectedRows, resolution.availableValues);
    return resolution;
}


function generateDedupe(selectedRows: namedRow[]):DedupeModel{
    let first = selectedRows[0];
    return {
        meta: {
            orgUnitId: first.orgUnitId,
            // periodId: 'blank',
            // dataType: 'blank'
        },
        data: {
            dataElementId: first.dataElementId,
            disAggregation: first.disAggregation,
            categoryOptionComboId: first.categoryOptionComboId
        },
        info: {
            orgUnitName: first.orgUnitName,
            dataElementName: first.dataElementName
        },
        resolution: getResolutionDetails(selectedRows),
        duplicates: extractDuplicates(selectedRows)
    };
}

function processResponse(rows:any[]):DedupeModel[]{
    if (rows.length===0) return [];
    let dedupesCount = rows[0].totalGroups;
    let dedupes = [];
    for (var groupNumber=1; groupNumber<=dedupesCount; groupNumber++){
        let selectedRows = rows.filter(row=>row.group===groupNumber);
        let dedupe:DedupeModel = generateDedupe(selectedRows);
        dedupes.push(dedupe)
    }
    return dedupes;
}

type namedRow = {
    orgUnitName:string;
    dataElementName:string;
    disAggregation:string;
    agencyName: string;
    mechanismNumber:number;
    partnerName:string;
    value:number;
    duplicateStatus:string;
    orgUnitId:string;
    dataElementId:string;
    categoryOptionComboId:string;
    group:number;
    totalGroups:number;
};

function nameRows(rows:any[]):namedRow[]{
    return rows.map(row=>{
        return {
            orgUnitName: row[0],
            dataElementName: row[1],
            disAggregation: row[2],
            agencyName: row[3],
            mechanismNumber: parseInt(row[4]),
            partnerName: row[5],
            value: parseInt(row[6]),
            duplicateStatus: row[7],
            orgUnitId: row[8],
            dataElementId: row[9],
            categoryOptionComboId: row[10],
            group: parseInt(row[11]),
            totalGroups: parseInt(row[12]),
        }
    });
}

export default function fetchDedupes(selectedFilters:FiltersModel):Promise<DedupeModel[]>{
    let requestUrl = generateDedupeUrl(selectedFilters);

    return getData(requestUrl)
        .then(response=>nameRows(response.listGrid.rows))
        .then(processResponse);
}

