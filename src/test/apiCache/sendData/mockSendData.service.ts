
let registeredMocks = {};

export function registerSendMock(method:string, url:string, response: object, test: (object)=>void){
    registeredMocks[url] = {test, method, response};
}

function isMocked(url:string):boolean{
    return registeredMocks[url];
}

export function mockSendData(method:string, url:string, data:any):Promise<object>{
    url = url.replace(/^http.+\/api/,'');
    if (!isMocked(url)) throw new Error(`sending data to server in test env: ${url}`);
    let mock = registeredMocks[url];
    if (mock.test) mock.test(data);
    // @ts-ignore
    expect(method).toBe(mock.method);
    return Promise.resolve(mock.response);
}