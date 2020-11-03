import {getData} from "../../shared/services/api.service";

export function getOrgUnitId():Promise<string>{
    return getData('/me?fields=organisationUnits[id]')
        .then(response=>response.organisationUnits[0].id)
}