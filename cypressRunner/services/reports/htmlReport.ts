const marge = require('mochawesome-report-generator');
export function htmlReport(report):Promise<any>{
    return marge.create(report);
}
