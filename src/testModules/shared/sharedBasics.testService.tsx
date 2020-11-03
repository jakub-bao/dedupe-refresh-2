import {setUpComponent} from "../../test/domServices/domUtils.testService";
import Main from "../../modules/main/components/main.component";
import React from "react";

export async function renderMain(){
    return await setUpComponent(<Main/>,['Data Deduplication','Filters','Dedupe Type', 'Organisation Unit *']);
}