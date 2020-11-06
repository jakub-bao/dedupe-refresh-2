import fetch from 'node-fetch';
import {DedupeValue, DedupeValueSet, dedupeValueSets} from "./dataValues.data";
import {pause} from "../../src/test/domServices/domUtils.testService";

function url(endpoint: string) {
    return `${process.env.DHIS_BASEURL}/api${endpoint}`;
}

dedupeValueSets.forEach((valueSet: DedupeValueSet) => {
    valueSet.dataValues.forEach(async (value: DedupeValue) => {
        let query = `de=${valueSet.dataElement_de||value.dataElement_de}&co=${valueSet.categoryOptionCombo_co||value.categoryOptionCombo_co}&ds=${valueSet.dataSet}&ou=${valueSet.orgUnitId}&pe=${valueSet.period}&value=${value.value}&cc=wUpfppgjEza&cp=${valueSet.categoryOption_cp||value.categoryOption_cp}`;
        if (value.isResolution) await pause(2);
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