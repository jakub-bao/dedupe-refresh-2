import {DedupeModel} from "../../results/models/dedupe.model";
import {postData} from "../../../sharedModules/shared/services/api.service";

const pureDedupesMech = 'xEzelmtHWPn';
const crosswalkDedupesMech = 'OM58NubPbx1';

const dedupeMechanisms = {
    PURE: pureDedupesMech,
    CROSSWALK: crosswalkDedupesMech
}


export async function  resolveDedupe(toSave:DedupeModel):Promise<boolean>{
    let query = `de=${toSave.data.dataElementId}&co=${toSave.data.categoryOptionComboId}&ou=${toSave.meta.orgUnitId}&pe=${toSave.meta.periodId}&value=${toSave.resolution.resolutionMethodValue.deduplicationAdjustmentValue}&cc=wUpfppgjEza&cp=${dedupeMechanisms[toSave.meta.dedupeType]}`
    return postData(`/dataValues`,query).then(res=>{
        return res.ok;
    }).catch(e => {
        console.error(e);
        return false;
    });
}