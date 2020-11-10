import {FilterType} from "../models/filters.model";
import {getPeriodsFromDatastore} from "./dataStorePeriods.service";
import {getData} from "../../../sharedModules/shared/services/api.service";
import {idName} from "../../../sharedModules/shared/models/idNameList.model";
import {DataTypePeriodList} from "../../../sharedModules/mainPage/models/dataTypePeriods.model";

function transformIdNameList(list:{id:string, displayName}[]):idName[]{
    return list.map(item=>{return{id:item.id, name:item.displayName}});
}

export default class FilterOptionsProvider {
    private operatingUnitList: idName[];
    private dataTypeList: idName[] = [{id: 'TARGETS', name: 'MER Targets'}, {id: 'RESULTS', name: 'MER Results'}];
    private periodList: DataTypePeriodList;
    private agencyList: idName[];
    private technicalAreaList: idName[];
    private dedupeTypeList: idName[] = [{id: 'PURE', name: 'Pure Dedupes'}, {id:'CROSSWALK', name: 'Crosswalk Dedupes'}];
    private includeResolvedList: idName[] = [{id: 'true', name: 'Yes'}, {id:'false', name: 'No'}];

    init():Promise<any>{
        return Promise.all([
            this.getOrganisationUnits(),
            this.getPeriods(),
            this.getAgencies(),
            this.getTechnicalAreas()
        ]);
    }

    private getAllOrganisationUnits():Promise<any>{
        return getData('/organisationUnits.json?filter=level:eq:3')
            .then(res=>transformIdNameList(res.organisationUnits));
    }

    private getUserOrganisationUnits():Promise<any>{
        return getData('/me?fields=organisationUnits[id,name]')
            .then(res=>res.organisationUnits);
    }

    private getOrganisationUnits():Promise<any>{
        return Promise.all([
            this.getUserOrganisationUnits(),
            this.getAllOrganisationUnits(),
        ]).then(response=>{
            let userOus = response[0];
            let allOus = response[1];
            let isGlobal = userOus.map(ou=>ou.name).includes('Global');
            if (isGlobal) return this.operatingUnitList = allOus;
            else return this.operatingUnitList = userOus;
        });
    }

    private getPeriods():Promise<any>{
        return getPeriodsFromDatastore().then(periodList=>this.periodList=periodList);
    }

    private getAgencies():Promise<any>{
        return getData('/categoryOptionGroups.json?filter=groupSets.id:eq:bw8KHXzxd9i&paging=false')
            .then(res=>transformIdNameList(res.categoryOptionGroups))
            .then((agencyList)=>{
                this.agencyList = agencyList;
        });
    }

    private getTechnicalAreas():Promise<any>{
        return getData('/dataElementGroups.json?filter=groupSets.id:eq:LxhLO68FcXm&fields=id,shortName,displayName&paging=false')
            .then(res=>res.dataElementGroups)
            .then(degs=>degs.map(de=>{return {
                id: de.shortName,
                name: de.displayName
            }}))
            .then((technicalAreaList)=> {
                this.technicalAreaList = technicalAreaList;
            });
    }

    getFilterOptions(type:FilterType){
        return this[type+'List'];
    }

    getPeriodOptions(dataType:string){
        if (!dataType) return [];
        return this.periodList[dataType.toLocaleLowerCase()];
    }

    getValueNameById(filterType:FilterType, filterValue:string|boolean):string{
        if (filterType===FilterType.includeResolved) {
            if (filterValue) return 'Include Resolved';
            return 'Unresolved Only';
        }
        if (filterType===FilterType.period) {
            return [].concat(this.periodList.results,this.periodList.targets).filter(idName=>idName.id===filterValue)[0].name;
        }
        return this[filterType+'List'].filter(idName=>idName.id===filterValue)[0].name;
    }
}


