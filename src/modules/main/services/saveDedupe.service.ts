import {DedupeModel} from "../../results/models/dedupe.model";

const pureDedupesMech = 'xEzelmtHWPn';

export function saveDedupe(dedupes:DedupeModel[], index:number):Promise<DedupeModel>{
    let toSave = dedupes[index-1];
    let query = `de=${toSave.data.dataElementId}&co=${toSave.data.categoryOptionComboId}&ou=${toSave.meta.orgUnitId}&pe=${toSave.meta.periodId}&value=${toSave.resolution.resolutionMethodValue.deduplicationAdjustmentValue}&cc=wUpfppgjEza&cp=${pureDedupesMech}`
    return Promise.resolve(null)
}