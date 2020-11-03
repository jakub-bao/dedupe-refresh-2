const config = require('../../config/cypressRunner.config.json');

export function groupSpecs(allSpecs:string[]):string[] {
    let groupSize = Math.floor(allSpecs.length/config.parallelThreads)+1;
    let groups:string[] = [];
    let currentGroup = [];
    for (var i=0;i<allSpecs.length;i++){
        currentGroup.push(allSpecs[i]);
        if (currentGroup.length>=groupSize) {
            groups.push(currentGroup.join(','));
            currentGroup = [];
        }
    }
    if (currentGroup.length>0) groups.push(currentGroup.join(','));
    return groups;
}
