import {getDataInTest} from "./getData/getData.service";
import {mockSendData} from "./sendData/mockSendData.service";

export function isTestEnv():boolean{
    return process.env.NODE_ENV==='test';
}

export function getViaTestCache(url:string, options?: any):Promise<any>{
    if (!isTestEnv()) return getDataInProd(url, options);
    else return getDataInTest(url);
}

export function sendDataViaTest(method:string, url:string, data:any):Promise<any>{
    if (!isTestEnv()) return sendDataInProd(method, url, data);
    else return mockSendData(method, url, data);
}

export function getDataInProd(url:string, options?:any):Promise<object>{
    return fetch(url, {credentials: 'include', ...options})
        .then(resp => resp.json());
}

function sendDataInProd(method:string, url:string, data:any){
    let processedData, contentType;
    if (typeof data==='object') {
        contentType = 'application/json';
        processedData = JSON.stringify(data);
    } else if (typeof data==='string'){
        contentType = 'application/x-www-form-urlencoded';
        processedData = data;
    } else {
        throw new Error(`Unrecognized data type to send`);
    }
    return fetch(url, {
        credentials: 'include',
        method: method,
        headers: {
            'Content-Type': contentType,
        },
        body: processedData
    })
    .then((response)=>{
        if (!response.ok) throw response;
        return response;
    })
}