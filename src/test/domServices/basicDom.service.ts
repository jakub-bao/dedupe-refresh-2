import {fireEvent, render, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import {ReactElement} from "react";

export function loadingDone():Promise<any>{
    if (!screen.queryByTestId('loading')) return Promise.resolve();
    return waitForElementToBeRemoved(() => screen.queryAllByTestId('loading'),{timeout: 10000});
}

export function textsPresentWait(texts:string[]):Promise<any>{
    return waitFor(() => textsPresent(texts),{timeout: 5000});
}

export function textsPresent(texts:string[]){
    texts.forEach((text:string)=>screen.getAllByText(text));
}

export function click(id:string){
    fireEvent.click(screen.getByTestId(id));
}

export async function select(selectId:string, value:string){
    fireEvent.mouseDown(screen.getByTestId(selectId).childNodes[0]);
    screen.getByText(value);
    fireEvent.click(screen.getByText(value));
    checkSelectValue(selectId, value);
}

export function checkSelectValue(selectId:string, value:string){
    expect(screen.getByTestId(selectId).textContent).toMatch(new RegExp(value));
}

export function checkRadioValue(id:string, value:string){
    // @ts-ignore
    expect(screen.getByTestId(`${id}_${value}`).checked, `Data Stream > ${id} > ${value}`).toBe(true);
}

export function checkboxValue(id:string, value:boolean){
    // @ts-ignore
    expect(screen.getByTestId(id).checked).toBe(value);
}

export async function setUpComponent(component:ReactElement, toContain: string[]):Promise<any>{
    let main = render(component);
    await loadingDone();
    await textsPresentWait(toContain);
    return main;
}

export function type(id:string, text:string) {
    fireEvent.change(screen.getByTestId(id), { target: { value: text } });
}

export let debug = ()=>screen.debug(null,10000000);

export function elementText(testid:string, text:string){
    const clean = (text:string)=>text.replace(/[^A-z0-9\$\,\.]+/g,'');
    expect(clean(screen.getByTestId(testid).textContent)).toMatch(clean(text));
}

export async function elementTextWait(testid:string, text:string){
    const clean = (text:string)=>text.replace(/[^A-z0-9\$\,\.]+/g,'');
    waitFor(()=>expect(clean(screen.getByTestId(testid).textContent)).toMatch(clean(text)));
}

export function elementTexts(testid:string, texts:string[]){
    texts.forEach((t)=>elementText(testid, t));
}

export function noText(text:string){
    expect(screen.queryByText(text)).not.toBeInTheDocument();
}

export function pause(seconds:number):Promise<void>{
    return new Promise<void>((done)=>{
        setTimeout(done, seconds*1000);
    });
}

export const flushPromises = () => new Promise(setImmediate);

export const waitForMechanisms = async ()=>screen.findAllByText('Mechanism');