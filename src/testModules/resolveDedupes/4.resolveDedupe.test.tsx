import {DedupeTestCase, TestFilters} from "../shared/models/test.models";
import {searchDedupes} from "../shared/sharedBasics.testService";
import {exist, noExist, noTexts, text} from "../../test/domServices/texts.testService";
import { click } from "../../test/domServices/domUtils.testService";
import {screen} from "@testing-library/react";

const BotswanaTestCase:DedupeTestCase = {
    testAs: 'test-de-superAdmin',
    name: `Botswana > MER Results > 2020 Q4`,
    filters: {
        operatingUnit: 'Botswana',
        dataType: 'MER Results',
        period: 'Oct - Dec 2020',
        includeResolved: true
    },
    expectedTokens: [
        'HTS_TST (N, DSD, KeyPop/Result): HTS received results',
        'PWID, Positive',
        'Bobirwa District',
        'HHS/CDC',
        '60030','60020','60010','Sum (180060)','Maximum (60030)'
    ],
    resolved: null,
};

function asInp(el:Element):HTMLInputElement{
    return el as HTMLInputElement;
}

test(`4 > Resolve Dedupes > Botswana`, async ()=>{
    await searchDedupes(BotswanaTestCase);
    noTexts(['resolved','unsaved']);
    text('pending');
    noExist('resolution_custom_input');
    click('resolution_0_custom');
    noTexts(['pending','resolved']);
    text('unsaved');
    exist('resolution_custom_input');
    expect(asInp(screen.getByTestId('resolution_custom_input')).value).toBe("60010")
    asInp(document.querySelector('[data-testid="resolution_custom_input"]')).value = "60040";
    expect(asInp(screen.getByTestId('resolution_custom_input')).value).toBe("60040")
    //resolution_custom_input
});