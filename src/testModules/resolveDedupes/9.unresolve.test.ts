import {searchDedupes} from "../shared/sharedBasics.testService";
import {Nigeria1} from "../renderDedupes/3.renderDedupes.testCases";
import { click } from "../../test/domServices/click.testService";
import {noTextsIn, textsIn} from "../../test/domServices/textsIn.testService";
import {noText, pause} from "../../test/domServices/domUtils.testService";
import {registerSendMock} from "../../test/apiCache/sendData/mockSendData.service";


test('9 > Unresolve Dedupe', async ()=>{
    await searchDedupes(Nigeria1);
    textsIn('status_1',['Resolved on server','Unresolve']);
    click('dedupe_1_unresolve');
    textsIn('unresolveConfirmDialog',['Do you want to unresolve the following Dedupe?','Data Element HTS_TST \\(N, DSD, KeyPop/Result\\): HTS received results']);
    registerSendMock('DELETE','/dataValues?de=qhGxKnmrZBd&co=NMYN9FAPqWa&ou=p7M264Wg1qB&pe=2020Q4&value=-30010&cc=wUpfppgjEza&cp=xEzelmtHWPn', {ok:true},null);
    click('unresolveConfirm');
    await pause(1);
    noText('Do you want to unresolve the following Dedupe?');
    noTextsIn('status_1',['Resolved on server']);
    textsIn('status_1',['Unresolved']);
});