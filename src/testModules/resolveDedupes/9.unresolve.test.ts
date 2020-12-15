import {searchDedupes} from "../shared/sharedBasics.testService";
import {Nigeria1} from "../renderDedupes/3.renderDedupes.testCases";
import {click} from "../../test/domServices/click.testService";
import {noTextsIn, textsIn} from "../../test/domServices/textsIn.testService";
import {pause, text} from "../../test/domServices/domUtils.testService";
import {registerSendMock} from "../../test/apiCache/sendData/mockSendData.service";


test('9 > Unresolve Dedupe', async ()=>{
    await searchDedupes(Nigeria1);
    textsIn('status_1',['Resolved on server','Unresolve']);
    registerSendMock('DELETE','/dataValues?de=qhGxKnmrZBd&co=NMYN9FAPqWa&ou=p7M264Wg1qB&pe=2020Q4&value=-30010&cc=wUpfppgjEza&cp=xEzelmtHWPn', {ok:true},null);

    click('dedupe_1_unresolve');
    text('Processing...');
    await pause(1);
    noTextsIn('status_1',['Resolved on server']);
    textsIn('status_1',['Unresolved']);
});