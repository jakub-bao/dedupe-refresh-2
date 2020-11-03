import fetch from 'node-fetch';
import {DedupeValue, DedupeValueSet, dedupeValueSets} from "./dataValues.data";

const dataSet = 'qzVASYuaIey';
const period = '2020Q2';

function url(endpoint:string){
    return `${process.env.DHIS_BASEURL}/api${endpoint}`;
}

dedupeValueSets.forEach((valueSet:DedupeValueSet)=>{
    valueSet.dataValues.forEach((value:DedupeValue)=>{
        let query = `de=${valueSet.dataElement}&co=${valueSet.categoryOptionCombo}&ds=${dataSet}&ou=${valueSet.orgUnitId}&pe=${period}&value=${value.value}&cc=${valueSet.attributeCategoryCombo}&cp=${value.attributeCategoryOption}`;
        console.log(`Inserting Data Value Set > ${query}`);
        fetch(url('/dataValues?'+query),{
            credentials: 'include',
            headers: {
                'Authorization': 'Basic dGVzdC1kZWR1cGUtc3VwZXJBZG1pbjpDeXByZXNzMSE=',
            },
            method: 'POST',
        }).catch(e=>{
            throw e;
        })
    })
});