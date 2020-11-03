export function getAuthorization(username:string):string {
    return 'Basic ' + btoa(`${username}:Cypress1!`);
}