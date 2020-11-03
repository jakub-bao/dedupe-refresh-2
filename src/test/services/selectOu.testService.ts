import {screen, waitFor} from "@testing-library/react";
import {select} from "../domServices/domUtils.testService";

export async function selectOu(ouName:string){
    await select('mechanismMenuSelect_Operating_Unit',ouName);
    await waitFor(()=>expect(screen.queryByTestId('loading')).not.toBeInTheDocument(),{timeout:10*1000});
}