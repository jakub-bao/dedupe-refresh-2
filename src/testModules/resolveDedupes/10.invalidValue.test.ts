import {checkCustomValue, searchDedupes, switchToCustom} from "../shared/sharedBasics.testService";
import {type} from "../../test/domServices/click.testService";
import {BotswanaTestCase} from "./4.resolveDedupe.test";
import {noTextIn, textIn} from "../../test/domServices/textsIn.testService";

test(`10 > Invalid Value`, async ()=>{
    await searchDedupes(BotswanaTestCase);
    switchToCustom(1);
    checkCustomValue(60030)
    await type('resolution_custom_input', '600');
    noTextIn('status_1','Resolve');
    textIn('status_1','Invalid value');
    await type('resolution_custom_input', '60050');
    textIn('status_1','Ready to resolve');
    await type('resolution_custom_input', '600500');
    textIn('status_1','Invalid value');
});