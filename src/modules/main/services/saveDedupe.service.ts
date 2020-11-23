import {DedupeModel} from "../../results/models/dedupe.model";
import {postData} from "../../../sharedModules/shared/services/api.service";

const pureDedupesMech = 'xEzelmtHWPn';

export async function  saveDedupe(toSave:DedupeModel):Promise<boolean>{
    let query = `de=${toSave.data.dataElementId}&co=${toSave.data.categoryOptionComboId}&ou=${toSave.meta.orgUnitId}&pe=${toSave.meta.periodId}&value=${toSave.resolution.resolutionMethodValue.deduplicationAdjustmentValue}&cc=wUpfppgjEza&cp=${pureDedupesMech}`
    return postData(`/dataValues`,query).then(res=>{
        return res.ok;
    }).catch(e => {
        console.error(e);
        return false;
    });
}