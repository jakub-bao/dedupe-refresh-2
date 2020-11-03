import {urlToFilename} from "./urlToFilename.service";

const fs = require('fs');
const cacheDir = process.cwd() + '/cachedApiCalls'

let cachedResponses;

export function initTestApiCache():void{
    if (cachedResponses) return;
    cachedResponses = fs.readdirSync(`${cacheDir}/`).map(fileName=>fileName.replace('.json',''));
}

function saveToFile(fileName:string, data:object){
    fs.writeFileSync(`${cacheDir}/${fileName}.json`, JSON.stringify(data));
}

export function saveResponse(username:string, url:string, response:object):void{
    saveToFile(urlToFilename(username, url), response);
}

export function isCached(username: string, url:string):boolean{
    let isCached = cachedResponses.includes(urlToFilename(username, url))
    if (!isCached) console.log(`Request is not cached: ${url.replace(/^.+\/api\//,'')}`);
    return isCached;
}

export function getFromCache(username:string, url:string):object{
    let fileName = urlToFilename(username, url);
    let path = `${cacheDir}/${fileName}.json`;
    let data = JSON.parse(fs.readFileSync(path));
    return data;
}