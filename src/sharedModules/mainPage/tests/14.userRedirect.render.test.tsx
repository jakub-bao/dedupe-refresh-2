import {setUpComponent} from "../../../test/domServices/basicDom.service";
import React from "react";
import {registerGetMock} from "../../../test/apiCache/getData/getMock.service";
import UserRedirect from "../components/userRedirect.component";

const testData = {
    partnerBad: {"userGroups": [{"name": "Data ER access"}, {"name": "OU Kenya Partner 850490065 users - CENTRE FOR HEALTH SOLUTIONS"}, {"name": "Data ESOP access"}, {"name": "Data MER entry"}, {"name": "Data MER access"}]},
    partnerGood: {"userGroups": [{"name": "Data ER entry"}, {"name": "OU Kenya Partner 850490065 users - CENTRE FOR HEALTH SOLUTIONS"}, {"name": "Data ER entry"}, {"name": "Data ESOP access"}, {"name": "Data MER entry"}, {"name": "Data MER access"}]},
};

function testCase(name:string, result: string) {
    test(`14 > render > Can't access > ${name}`, async () => {
        registerGetMock('/me?fields=userGroups[name]', testData[name]);
        await setUpComponent(<UserRedirect/>, [result])
    });
}

testCase('partnerBad', 'Access Denied');
testCase('partnerGood','Please select a Funding Mechanism to submit templates');