import {execSync} from "child_process";
import {runSpecs} from "./services/specs/runSpec";
import {htmlReport} from "./services/reports/htmlReport";
import {findSpecs} from "./services/specs/findSpecs";
import {groupSpecs} from "./services/specs/groupSpecs";
import {timerEnd, timerStart} from "./services/time/time";
import {mergeJsonReports} from "./services/reports/mergeJsonReports";
import {consoleReport} from "./services/reports/consoleReport";
let config = require('./config/cypressRunner.config.json');

timerStart();
execSync('rm -rf mochawesome-report/*')

let specs = findSpecs();
if (config.devMode) specs = specs.slice(0,5);
let groupedSpecs = groupSpecs(specs);

let runs:Promise<any>[] = groupedSpecs.map((path,index)=>runSpecs(path, index));
Promise.all(runs).then(async ()=>{
    let mergedReport = await mergeJsonReports();
    consoleReport(mergedReport);
    await htmlReport(mergedReport);
    timerEnd();
});