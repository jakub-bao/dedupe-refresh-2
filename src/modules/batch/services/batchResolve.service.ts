import {DedupeModel} from "../../results/models/dedupe.model";
import {BatchActionType} from "../../menu/components/batchResolveMenu.component";
import {deleteData, postData} from "../../../sharedModules/shared/services/api.service";

type DataValue = {
    dataElement: string,
    period: string,
    orgUnit: string,
    categoryOptionCombo: string,
    attributeOptionCombo: string,
    value: string
}

function dedupeToDataValue(dedupe:DedupeModel):DataValue{
    return {
        attributeOptionCombo: '',
        categoryOptionCombo: dedupe.data.categoryOptionComboId,
        dataElement: dedupe.data.dataElementId,
        orgUnit: dedupe.meta.orgUnitId,
        period: dedupe.meta.periodId,
        value: dedupe.resolution.resolutionMethodValue.deduplicationAdjustmentValue.toString()
    }
}

export async function batchResolve(dedupes:DedupeModel[],action:BatchActionType):Promise<boolean>{
    let dataValues:DataValue[] = dedupes.map(dedupeToDataValue);
    let httpMethod:(url:string, payload:any)=>Promise<any>;
    if (action===BatchActionType.resolve) httpMethod = postData;
    else httpMethod = deleteData;
    let response = await httpMethod('/dataValueSets', {dataValues});
    return response.ok;
}