import {getFromCache, isCached, saveResponse} from "./httpStore.service";
import {getAuthorization} from "./authorization.service";
import {getMock, isMockedAsGet} from "./getMock.service";

let username;

export function testAs(u:string){
    username = u;
}

export function getDataInTest(url:string):Promise<object> {
    if (!username) throw new Error(`Each test scenario must start with a login`)
    if (isMockedAsGet(url)) return getMock(url);
    if (isCached(username, url)) return Promise.resolve(getFromCache(username, url));
    if (!username) throw new Error('Not logged in');
    return fetch(url, {
        headers: {
            'Authorization': getAuthorization(username)
        },
        method: "GET"
    })
    .then(resp => resp.json())
    .then(resp=>{
        saveResponse(username, url, resp);
        return resp;
    });
}

