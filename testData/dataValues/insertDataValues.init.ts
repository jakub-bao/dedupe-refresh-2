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
        fetch(url('/dataValues?' + query), {
            credentials: 'include',
            headers: {
                'Authorization': 'Basic dGVzdC1kZS1zdXBlckFkbWluOkN5cHJlc3MxIQ==',
            },
            method: 'POST',
        }).then(res=>{
            console.log(`${res.statusText} > Inserting DV > ${query}`);
        }).catch(e => {
            throw e;
        })
    })
});