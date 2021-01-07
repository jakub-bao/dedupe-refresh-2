import {checkStatus, clickCheckbox, searchDedupes} from "../shared/sharedBasics.testService";
import {Nigeria1, Rwanda1} from "../renderDedupes/3.renderDedupes.testCases";
import {click} from "../../test/domServices/click.testService";
import {registerSendMock} from "../../test/apiCache/sendData/mockSendData.service";
import {text} from "../../test/domServices/texts.testService";
import {pause} from "../../test/domServices/domUtils.testService";
import {noTextsIn, textsIn} from "../../test/domServices/textsIn.testService";

async function unsetMethod(){
    await searchDedupes(Nigeria1);
    checkStatus(1, "Resolved on server");
    clickCheckbox(1);
    click('batch_method_unset');
    checkStatus(1, "Ready to unresolve");
}

test(`15 > Batch Unset > From Resolved on server > Unresolve individually`,async ()=>{
    await unsetMethod();
    registerSendMock('DELETE','/dataValues?de=qhGxKnmrZBd&co=NMYN9FAPqWa&ou=p7M264Wg1qB&pe=2020Q4&value=null&cc=wUpfppgjEza&cp=xEzelmtHWPn', {ok:true},null);
    click('dedupe_1_unresolve');
    text('Processing...');
    await pause(1);
    noTextsIn('status_1',['Resolved on server']);
    textsIn('status_1',['Unresolved']);
});

test(`15 > Batch Unset > From Resolved on server > Unresolve as batch`,async ()=>{
    await unsetMethod();
    registerSendMock('POST','/dataValueSets',{ok:true},(request)=>{
        expect(request).toStrictEqual({"dataValues":[{"attributeOptionCombo":"X8hrDf6bLDC","categoryOptionCombo":"NMYN9FAPqWa","dataElement":"qhGxKnmrZBd","orgUnit":"p7M264Wg1qB","period":"2020Q4","value":" "}]});
    });
    click('batch_action_resolve');
});

test(`15 > Batch Unset > From Unresolved`,async ()=>{
    await searchDedupes(Rwanda1);
    click('resolution_1_maximum');
    checkStatus(1, "Ready to resolve");
    clickCheckbox(1);
    click('batch_method_unset');
    checkStatus(1, "Unresolved");
});