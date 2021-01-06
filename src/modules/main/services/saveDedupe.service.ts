import {DedupeModel} from "../../results/models/dedupe.model";
import {deleteData, postData} from "../../../sharedModules/shared/services/api.service";
import {
    crosswalkDedupesMechCategoryOption,
    pureDedupesMechCategoryOption
} from "../../../config/deduplicationMechanism.values";

const dedupeMechanisms = {
    PURE: pureDedupesMechCategoryOption,
    CROSSWALK: crosswalkDedupesMechCategoryOption
}

const getQuery = (toSave:DedupeModel)=>`de=${toSave.data.dataElementId}&co=${toSave.data.categoryOptionComboId}&ou=${toSave.meta.orgUnitId}&pe=${toSave.meta.periodId}&value=${toSave.resolution.resolutionMethodValue.deduplicationAdjustmentValue}&cc=wUpfppgjEza&cp=${dedupeMechanisms[toSave.meta.dedupeType]}`;

const handleRequest = res=>{
    if (!res || !res.ok || res.redirected) throw new Error(`Cannot resolve dedupe`);
};

export async function resolveDedupe(toSave:DedupeModel):Promise<void>{
    return postData(`/dataValues`,getQuery(toSave)).then(handleRequest);
}

export async function unresolveDedupe(toSave:DedupeModel):Promise<void>{
    return deleteData(`/dataValues?${getQuery(toSave)}`).then(handleRequest);
}