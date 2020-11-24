import {fireEvent, screen} from "@testing-library/react";
import {debug, pause} from "./domUtils.testService";

export function click(id:string){
    fireEvent.click(screen.getByTestId(id));
}

export function clickByText(text:string){
    fireEvent.click(screen.getByText(text));
}

export async function select(selectId:string, value:string){
    fireEvent.mouseDown(screen.getByTestId(selectId).childNodes[0]);
    // debug();
    screen.getByText(value);
    fireEvent.click(screen.getByText(value));
    checkSelectValue(selectId, value);
}

export function checkSelectValue(selectId:string, value:string){
    expect(screen.getByTestId(selectId).textContent).toMatch(new RegExp(value));
}

export function checkRadioValue(id:string, value:string){
    // @ts-ignore
    expect(screen.getByTestId(`${id}_${value}`).checked, `Checkbox > ${id} > ${value}`).toBe(true);
}

export function checkboxValue(id:string, value:boolean){
    // @ts-ignore
    expect(screen.getByTestId(id).checked).toBe(value);
}

export async function type(id:string, value:string){
    fireEvent.change(screen.getByTestId(id), { target: { value: value } })
    // fireEvent.click(screen.getByTestId(id));
    // fireEvent.keyDown(screen.getByTestId(id),{key: 'Backspace', code: 'Backspace'});
    await pause(1);
}