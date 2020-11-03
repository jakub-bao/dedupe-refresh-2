import {idNameList} from "../../sharedModules/shared/models/idNameList.model";

export function listShouldInclude(list:idNameList, toInclude:string[]){
    toInclude.forEach(item=>{
        // @ts-ignore
        expect(list.map(it=>it.name).includes(item),`Should include ${item}, list: ${JSON.stringify(list)}`).toBe(true);
    })
}