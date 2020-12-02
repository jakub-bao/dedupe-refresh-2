import {DedupeModel} from "../../results/models/dedupe.model";
import {deleteData, postData} from "../../../sharedModules/shared/services/api.service";

const pureDedupesMech = 'xEzelmtHWPn';
const crosswalkDedupesMech = 'OM58NubPbx1';

const dedupeMechanisms = {
    PURE: pureDedupesMech,
    CROSSWALK: crosswalkDedupesMech
}

const getQuery = (toSave:DedupeModel)=>`de=${toSave.data.dataElementId}&co=${toSave.data.categoryOptionComboId}&ou=${toSave.meta.orgUnitId}&pe=${toSave.meta.periodId}&value=${toSave.resolution.resolutionMethodValue.deduplicationAdjustmentValue}&cc=wUpfppgjEza&cp=${dedupeMechanisms[toSave.meta.dedupeType]}`;

export async function resolveDedupe(toSave:DedupeModel):Promise<boolean>{
    return postData(`/dataValues`,getQuery(toSave)).then(res=>{
        return res.ok;
    }).catch(e => {
        console.error(e);
        return false;
    });
}

export async function unresolveDedupe(toSave:DedupeModel):Promise<boolean>{
    return deleteData(`/dataValues?${getQuery(toSave)}`).then(res=>{
        return res.ok;
    }).catch(e => {
        console.error(e);
        return false;
    });
}