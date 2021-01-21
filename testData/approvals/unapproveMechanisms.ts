import {readFileSync} from "fs";

function url(endpoint:string){
    return `${process.env.DHIS_BASEURL}/api${endpoint}`;
}

const error = (response:any)=>{
    console.log(`Cannot submit Mechanism`);
    console.log(response);
}

const data = readFileSync('./mechanismIds.txt', 'utf8')
data.split('\n').forEach((mechId:string)=>{
    const request = {"approvals":[{"aoc":mechId,"ou":"a71G4Gtcttv"}],"pe":["2019Oct"],"wf":["WUD8TApgOu1"]};
    fetch(url('/dataApprovals/unapprovals'), {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic dGVzdC1lcmItc3VwZXItQWRtaW46Q3lwcmVzcyE='
        },
        body: JSON.stringify(request)
    }).then(response=>{
        if (response.status!==204) error(response);
        else console.log(`Mechanism Submitted`)
    }).catch(e=>error(e));
});