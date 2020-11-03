export type idName = {id:string, name: string, periodExpired?:boolean};
export type idNameList = idName[];
export function pushToList(list:idNameList,item:idName):void{
    if (!list.some(it=>it.id===item.id)) list.push(item);
}