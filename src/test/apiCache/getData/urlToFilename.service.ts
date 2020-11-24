let sanitize = (text)=>text
    .replace(/[^A-z0-9]+/g,'_')
    // eslint-disable-next-line
    .replace(/[\[\]]+/g,'_')
let tokensToRemove = [
    /^.+\/api\//,
    /var/g,
    /null/g,
    /pageSize/g,
    /json/g,
    /paging/g,
    /true/g,
    /false/g,
    /var/g,
    /rootJunction/g,
    /filter/g,
    /startDate/g,
    /endDate/g,
    /01_01/g,
    /&cache.+$/g,
];
export function urlToFilename(username:string, url:string):string{
    tokensToRemove.forEach(re=>{
        url = url.replace(re,'')
    });
    return sanitize(username)+'_'+sanitize(url);
}