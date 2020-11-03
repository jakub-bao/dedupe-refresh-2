import {screen, waitFor} from "@testing-library/react";

export function waitForTexts(textsToFind:string[]):Promise<any>{
    return waitFor(() => texts(textsToFind),{timeout: 5000});
}

export function texts(texts:string[]){
    texts.forEach((textToFind:string)=>text(textToFind));
}

export function text(textToFind:string){
    return screen.getAllByText(textToFind);
}

export function noTexts(textsToFind:string[]){
    textsToFind.forEach(noText);
}

export function noText(text:string){
    expect(screen.queryByText(text)).not.toBeInTheDocument();
}