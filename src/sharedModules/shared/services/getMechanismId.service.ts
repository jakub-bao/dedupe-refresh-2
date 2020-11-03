export function getMechCo(mechComboId:string):string{
    if (!mechComboId) return null;
    return mechComboId.split(':')[0];
}

export function getMechCoc(mechComboId:string):string{
    if (!mechComboId) return null;
    return mechComboId.split(':')[1];
}