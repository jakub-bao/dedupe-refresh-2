import {readFileSync, writeFileSync} from "fs";
import {parseString} from "xml2js";
var beautify = require("json-beautify");

let inputPath = '../schemas/erbMetadataExport.xml';
let outputPath = './src/config/dataElements.json';

let file = readFileSync(inputPath);
parseString(file, function (err, result) {
    if (err) throw err;
    writeFileSync(outputPath, beautify(clean(result), null, 4, ));
    console.log('XML Metadata transformed successfully', outputPath);
});

function deleteProps(o:any){
    delete o.ignoreApproval;
    delete o.lastUpdatedBy;
    delete o.lastUpdated;
    delete o.created;
    delete o.publicAccess;
    delete o.user;
    delete o.userGroupAccesses;
    Object.keys(o).forEach(prop=>{
        if (Array.isArray(o[prop])) o[prop].forEach(deleteProps);
        if (typeof o[prop]==='object') deleteProps(o[prop]);
    });
}

function clean(json:any):object{
    json = json.metadata
    delete json['$']
    deleteProps(json)
    return json;
}