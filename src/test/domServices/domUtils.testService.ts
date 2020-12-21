import {fireEvent, render, screen, waitForElementToBeRemoved} from "@testing-library/react";
import {ReactElement} from "react";
import {noText, noTexts, text, texts, waitForTexts} from "./texts.testService";
import {checkboxValue, checkRadioValue, checkSelectValue, click, clickByText, select} from "./click.testService"

export {waitForTexts, text, texts, noText, noTexts};
export {click, clickByText, checkboxValue, checkRadioValue, checkSelectValue, select};

export async function loadingDone():Promise<any>{
    await pause(0.2);
    if (!screen.queryByTestId('loading')) return Promise.resolve();
    return waitForElementToBeRemoved(() => screen.queryAllByTestId('loading'),{timeout: 15000});
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

export function pause(seconds:number):Promise<void>{
    return new Promise<void>((done)=>{
        setTimeout(done, seconds*1000);
    });
}