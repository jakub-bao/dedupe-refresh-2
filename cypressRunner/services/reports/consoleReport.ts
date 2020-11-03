// @ts-nocheck

var colors = require('colors');

type MochaReport = {
    stats: {
        suites: number;
        tests: number;
        passes: number;
        failures: number;
        passPercent: number;
        skipped: number;
    }
}

let log = (...items) => console.log('\t',...items);
let line = (n:number)=>{
    if (!n) n=1;
    for (var i=0;i<n;i++) log('\n');
}

function intro(results:MochaReport){
    let stats = results.stats;
    line(2);
console.log(` ________      ___    ___ ________  ________  _______   ________   ________      
|\\   ____\\    |\\  \\  /  /|\\   __  \\|\\   __  \\|\\  ___ \\ |\\   ____\\ |\\   ____\\     
\\ \\  \\___|    \\ \\  \\/  / | \\  \\|\\  \\ \\  \\|\\  \\ \\   __/|\\ \\  \\___|_\\ \\  \\___|_    
 \\ \\  \\        \\ \\    / / \\ \\   ____\\ \\   _  _\\ \\  \\_|/_\\ \\_____  \\\\ \\_____  \\   
  \\ \\  \\____    \\/  /  /   \\ \\  \\___|\\ \\  \\\\  \\\\ \\  \\_|\\ \\|____|\\  \\\\|____|\\  \\  
   \\ \\_______\\__/  / /      \\ \\__\\    \\ \\__\\\\ _\\\\ \\_______\\____\\_\\  \\ ____\\_\\  \\ 
    \\|_______|\\___/ /        \\|__|     \\|__|\\|__|\\|_______|\\_________\\\\_________\\
             \\|___|/                                      \\|_________\\|_________|
                                                                                 
`.green);
    line()
    if (stats.failures===0) log('All Tests Passing!'.green);
    else log('Tests Failed!'.red);
}

function stats(results:MochaReport){
    let stats = results.stats;
    let stat = (key:string,value:string,color:string)=>log(`${key}\t`.grey,`${value}`.bold[color?color:'bold'])
    stat('Tests #', stats.tests);
    stat('Passes #', stats.passes, 'green');
    stat('Failures #', stats.failures,'red');
    stat('%\t', Math.floor(stats.passPercent));
}

function fails(results:any){
    let failedSpecs = results.results.filter(r=>r.suites.some(s=>s.failures.length>0)||r.tests.some(t=>!t.pass)).map(s=>s.file);
    if (failedSpecs.length===0) return;
    log('Failed specs'.red);
    failedSpecs.forEach(f=>log(f));
}

export function consoleReport(results:MochaReport) {
    intro(results);
    line();
    stats(results);
    line();
    fails(results);
    line();
}