import fetch from 'node-fetch';
import {DedupeValue, DedupeValueSet, dedupeValueSets} from "./dataValues.data";

function url(endpoint: string) {
    return `${process.env.DHIS_BASEURL}/api${endpoint}`;
}

dedupeValueSets.forEach((valueSet: DedupeValueSet) => {
    valueSet.dataValues.forEach((value: DedupeValue) => {
        let query = `de=${value.dataElement_de}&co=${value.categoryOptionCombo_co}&ds=${valueSet.dataSet}&ou=${valueSet.orgUnitId}&pe=${valueSet.period}&value=${value.value}&cc=wUpfppgjEza&cp=${value.categoryOption_cp}`;
        console.log(`Inserting Data Value Set > ${query}`);
        fetch(url('/dataValues?' + query), {
            credentials: 'include',
            headers: {
                'Authorization': 'Basic dGVzdC1kZWR1cGUtc3VwZXJBZG1pbjpDeXByZXNzMSE=',
            },
            method: 'POST',
        }).catch(e => {
            throw e;
        })
    })
});