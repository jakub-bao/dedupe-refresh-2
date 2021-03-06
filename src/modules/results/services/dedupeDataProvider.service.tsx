import {
    DedupeModel,
    DedupeResolutionAvailableValues,
    DedupeResolutionMethodValue,
    DedupeResolutionModel,
    DuplicateModel,
    ResolutionMethodType,
    updateStatus
} from "../models/dedupe.model";
import {DedupeType, FilterDedupeStatus, FiltersModel} from "../../menu/models/filters.model";
import {getData} from "../../../sharedModules/shared/services/api.service";

const random = ()=>Math.random()*10e15

export function generateDedupeUrl(selectedFilters:FiltersModel):string{
    return `/sqlViews/wzpSd6j89wc/data?paging=false`
        + `&var=ou:${selectedFilters.operatingUnit}`
        + `&var=dt:${selectedFilters.dataType}`
        + `&var=pe:${selectedFilters.period}`
        + `&var=ty:${selectedFilters.dedupeType||'PURE'}`
        + `&var=rs:${selectedFilters.status===FilterDedupeStatus.resolvedAndUnresolved}`
        + `&var=ps:100000`
        + `&var=pg:1`
        + `&var=ag:${selectedFilters.agency||'NONE'}`
        + `&var=dg:${selectedFilters.technicalArea||'NONE'}`
        + `&cache=${random()}`;
}


const removeAdjustment = record=>!["00000","00001"].includes(record.mechanismNumber);

function extractDuplicates(rows:namedRow[]):DuplicateModel[]{
    return rows.filter(removeAdjustment).map(namedRow=>{
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

function getResolution(selectedRows:namedRow[], availableValues:DedupeResolutionAvailableValues):DedupeResolutionMethodValue{
    const dedupeAdjustmentEntry = selectedRows.filter(isDedupeFilter)[0].value;
    const resolutionValue = selectedRows.map(record=>record.value).reduce((a,b)=>a+b,0);
    if (dedupeAdjustmentEntry===0) return {
        resolutionValue: resolutionValue,
        resolutionMethod: ResolutionMethodType.sum,
        deduplicationAdjustmentValue: dedupeAdjustmentEntry
    }
    if (resolutionValue===availableValues.maximum) return {
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
    const enteredValues = selectedRows.filter(removeAdjustment).map(record=>record.value);
    return {
        sum: enteredValues.reduce((a,b)=>a+b,0),
        maximum: Math.max(...enteredValues),
    };
}


function getResolutionDetails(selectedRows: namedRow[]):DedupeResolutionModel{
    let resolution:DedupeResolutionModel = {
        resolutionMethodValue: null,
        original_resolutionMethodValue: null,
        availableValues: getAvailableValues(selectedRows)
    };
    const isResolved = selectedRows[0].duplicateStatus==='RESOLVED';
    if (isResolved) {
        resolution.resolutionMethodValue = getResolution(selectedRows, resolution.availableValues);
        resolution.original_resolutionMethodValue = JSON.parse(JSON.stringify(resolution.resolutionMethodValue));
    }
    return resolution;
}

function getDe(filters:FiltersModel,rows:namedRow[]):string{
    if (filters.dedupeType===DedupeType.pure) return rows[0].dataElementId;
    return rows.filter(row=>row.partnerName!=='DSD Value')[0].dataElementId;
}

function generateDedupe(selectedRows: namedRow[], groupNumber:number, filters:FiltersModel):DedupeModel{
    let first = selectedRows[0];
    let dedupe:DedupeModel = {
        meta: {
            internalId: groupNumber,
            orgUnitId: first.orgUnitId,
            periodId: filters.period,
            dedupeType: filters.dedupeType
        },
        data: {
            dataElementId: getDe(filters, selectedRows),
            disAggregation: first.disAggregation,
            categoryOptionComboId: first.categoryOptionComboId
        },
        info: {
            orgUnitName: first.orgUnitName,
            dataElementName: first.dataElementName
        },
        resolution: getResolutionDetails(selectedRows),
        duplicates: extractDuplicates(selectedRows),
        status: null,
        tableData:{}
    };
    updateStatus(dedupe);
    return dedupe;
}

function processResponse(rows:any[], filters:FiltersModel):DedupeModel[]{
    if (rows.length===0) return [];
    let dedupesCount = rows[0].totalGroups;
    let dedupes = [];
    for (var groupNumber=1; groupNumber<=dedupesCount; groupNumber++){
        const gn = groupNumber;
        let selectedRows = rows.filter(row=>row.group===gn);
        let dedupe:DedupeModel = generateDedupe(selectedRows, groupNumber, filters);
        dedupes.push(dedupe)
    }
    return dedupes;
}

type namedRow = {
    orgUnitName:string;
    dataElementName:string;
    disAggregation:string;
    agencyName: string;
    mechanismNumber:string;
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
            mechanismNumber: row[4],
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
        .then((response)=>processResponse(response, selectedFilters))
}

