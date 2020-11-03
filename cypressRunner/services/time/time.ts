let startDate:Date;

export function timerStart(){
    startDate = new Date();
}

export function timerEnd():void{
    var endDate   = new Date();
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    console.log(`Tests completed in ${Math.floor(seconds)} seconds`);
}