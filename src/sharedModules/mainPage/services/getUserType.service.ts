import {UserType} from "../models/userTypes.model";
import {getData} from "../../shared/services/api.service";
import {idNameList} from "../../shared/models/idNameList.model";

export function getUserType():Promise<{userType: UserType, hasAccess: boolean, organizationName:string}>{
    return getData('/me?fields=userGroups[name]')
        .then((response:any)=>response.userGroups)
        .then((groups:idNameList)=>{
            let typeGroup = groups.filter(g=>g.name.includes('users')).length>0 && groups.filter(g=>g.name.includes('users'))[0].name;
            let erAccessGroup = groups.filter(g=>g.name==='Data ER access')[0];
            let erEntryGroup = groups.filter(g=>g.name==='Data ER entry')[0];
            let adminGroup = groups.filter(g=>g.name.includes('Admin Access'))[0];
            let userType: UserType = UserType.unknown;
            let organizationName = null;
            let hasAccess:boolean = null;
            if (typeof typeGroup==='string') {
                if (typeGroup.includes('Partner')) {
                    userType = UserType.partner;
                    hasAccess = !!erEntryGroup;
                    organizationName = typeGroup.replace(/^OU .+ - /, '');
                }
                if (typeGroup.includes('Agency')) {
                    userType = UserType.agency;
                    hasAccess = !!erAccessGroup;
                    organizationName = typeGroup.replace(/^OU .+ Agency /, '').replace(' users', '');
                }
                if (typeGroup.includes('Global Agency')) {
                    userType = UserType.globalAgency;
                    hasAccess = !!erAccessGroup;
                    organizationName = typeGroup.replace(/^OU .+ Agency /, '').replace(' users', '');
                }
            }
            if (adminGroup) {
                userType = UserType.superUser;
                hasAccess = true;
                organizationName = 'DATIM Superuser'
            }
            return {userType, hasAccess, organizationName};
        });
}