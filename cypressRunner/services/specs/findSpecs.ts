import {readdirSync} from "fs";

function getFiles(path:string):string[]{
    const content:string[] = readdirSync(path).map(fileName=>path+'/'+fileName);
    let files = content.filter(i=>i.includes('test.ts'));
    let dirs = content.filter(i=>!i.includes('test.ts'));
    dirs.forEach((dir:string)=>{
        files = files.concat(getFiles(dir));
    });
    return files;
}


export function findSpecs():string[]{
    return getFiles("./cypress/integration");
}