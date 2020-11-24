let registeredMocks = {};

const clean = (url)=>url.replace(/^http.+\/api/,'').replace(/&cache.+$/,'');

export function registerGetMock(url:string, response: object){
    registeredMocks[clean(url)] = response;
}

export function unRegisterGetMock(url:string) {
    delete registeredMocks[clean(url)];
}

export function isMockedAsGet(url:string):boolean{
    return registeredMocks[clean(url)];
}

export function getMock(url:string):Promise<any>{
    console.log(`Resolving mocked response to:`,url);
    return Promise.resolve(registeredMocks[clean(url)]);
}