import {fireEvent, render, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import {ReactElement} from "react";
import {waitForTexts, text, texts, noText, noTexts} from "./texts.testService";
import {click, clickByText, checkboxValue, checkRadioValue, checkSelectValue, select} from "./click.testService"
export {waitForTexts, text, texts, noText, noTexts};
export {click, clickByText, checkboxValue, checkRadioValue, checkSelectValue, select};

export function loadingDone():Promise<any>{
    if (!screen.queryByTestId('loading')) return Promise.resolve();
    return waitForElementToBeRemoved(() => screen.queryAllByTestId('loading'),{timeout: 10000});
}

export async function setUpComponent(component:ReactElement, toContain: string[]):Promise<any>{
    let main = render(component);
    await loadingDone();
    await waitForTexts(toContain);
    return main;
}

export function typeIn(id:string, text:string) {
    fireEvent.change(screen.getByTestId(id), { target: { value: text } });
}

export let debug = ()=>screen.debug(null,10000000);
//
// export function elementText(testid:string, text:string){
//     const clean = (text:string)=>text.replace(/[^A-z0-9\$\,\.]+/g,'');
//     expect(clean(screen.getByTestId(testid).textContent)).toMatch(clean(text));
// }
//
// export async function elementTextWait(testid:string, text:string){
//     const clean = (text:string)=>text.replace(/[^A-z0-9\$\,\.]+/g,'');
//     waitFor(()=>expect(clean(screen.getByTestId(testid).textContent)).toMatch(clean(text)));
// }
//
// export function elementTexts(testid:string, texts:string[]){
//     texts.forEach((t)=>elementText(testid, t));
// }
//
// export function noText(text:string){
//     expect(screen.queryByText(text)).not.toBeInTheDocument();
// }

export function pause(seconds:number):Promise<void>{
    return new Promise<void>((done)=>{
        setTimeout(done, seconds*1000);
    });
}

// export const flushPromises = () => new Promise(setImmediate);

// export const waitForMechanisms = async ()=>screen.findAllByText('Mechanism');