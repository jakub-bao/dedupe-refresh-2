import {getData} from "../../../sharedModules/shared/services/api.service";
import {idNameList} from "../../../sharedModules/shared/models/idNameList.model";
import {DataTypePeriodList} from "../../../sharedModules/mainPage/models/dataTypePeriods.model";

function generatePeriodName(periodKey:string):string{
    let year:number = parseInt(periodKey.substr(0,4));
    let monthString:string = periodKey.replace(/[0-9]{4}/,'');
    switch(monthString){
        case "Q1": return `Jan - Mar ${year}`;
        case "Q2": return `Apr - Jun ${year}`;
        case "Q3": return `Jul - Sep ${year}`;
        case "Q4": return `Oct - Dec ${year}`;
        case "Oct": return `Oct ${year} - Sep ${year+1}`;
    }
}

function transformPeriod(periodResponse:any):idNameList {
    let today = new Date();
    return Object.keys(periodResponse)
        .filter(periodKey=>{
            let start  = new Date(periodResponse[periodKey].start);
            let end = new Date(periodResponse[periodKey].end);
            return start < today && today < end;
        })
        .map(periodKey=>{
            return {
                id: periodKey,
                name: generatePeriodName(periodKey)
            }
        });
}

function transformFromDatastore(response:any):DataTypePeriodList {
    return {
        targets: transformPeriod(response.TARGETS),
        results: transformPeriod(response.RESULTS)
    };
}

export function getPeriodsFromDatastore():Promise<DataTypePeriodList>{
    return getData('/dataStore/dedupe/periodSettings').then(transformFromDatastore)
}