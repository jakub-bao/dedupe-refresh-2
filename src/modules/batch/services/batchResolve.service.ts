import {DedupeModel} from "../../results/models/dedupe.model";
import {BatchActionType} from "../../menu/components/batchResolveMenu.component";
import {postData} from "../../../sharedModules/shared/services/api.service";
import {
    crosswalkDedupesCategoryOptionCombo,
    pureDedupesCategoryOptionCombo
} from "../../../config/deduplicationMechanism.values";

type DataValue = {
    dataElement: string,
    period: string,
    orgUnit: string,
    categoryOptionCombo: string,
    attributeOptionCombo: string,
    value: string
}

const dedupeMechanismCombo = {
    PURE: pureDedupesCategoryOptionCombo,
    CROSSWALK: crosswalkDedupesCategoryOptionCombo
}

function dedupeToDataValue(action:BatchActionType){
    return function dedupeToDataValue(dedupe:DedupeModel):DataValue{
        return {
            attributeOptionCombo: dedupeMechanismCombo[dedupe.meta.dedupeType],
            categoryOptionCombo: dedupe.data.categoryOptionComboId,
            dataElement: dedupe.data.dataElementId,
            orgUnit: dedupe.meta.orgUnitId,
            period: dedupe.meta.periodId,
            value: action===BatchActionType.resolve?dedupe.resolution.resolutionMethodValue.deduplicationAdjustmentValue.toString():" "
        }
    }
}

export async function batchResolve(dedupes:DedupeModel[],action:BatchActionType):Promise<boolean>{
    let dataValues:DataValue[] = dedupes.map(dedupeToDataValue(action));
    let response = await postData('/dataValueSets', {dataValues});
    return response.ok;
}