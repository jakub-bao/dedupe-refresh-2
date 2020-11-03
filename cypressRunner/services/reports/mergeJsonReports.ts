import {merge} from 'mochawesome-merge';

export function mergeJsonReports():Promise<any>{
    const options = {
        files: ['./mochawesome-report/*.json']
    };
    return merge(options);
}
