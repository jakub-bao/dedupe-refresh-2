import React from "react";
import {DedupeModel} from "../models/dedupe.model";
import ResultsTable from "./resultsTable.component";
import {Typography} from "@material-ui/core";
import {
    ChangeResolutionMethod,
    SetResolutionValue
} from "../../resolutionMethodCell/components/resolutionMethodCell.component";
import {ResolveDedupe, UnresolveDedupe} from "../../resolutionMethodCell/components/statusCell.component";

const styles = {
    info: {
        margin: '30px 5px'
    }
};

export default function Results({filteredDedupes,setResolutionValue, changeResolutionMethod, resolveDedupe, unresolveDedupe}:{
    filteredDedupes: DedupeModel[],
    setResolutionValue:SetResolutionValue,
    changeResolutionMethod: ChangeResolutionMethod,
    resolveDedupe: ResolveDedupe,
    unresolveDedupe: UnresolveDedupe
}) {
    if (!filteredDedupes) return null;
    if (filteredDedupes.length===0) return <Typography style={styles.info}>No duplicates found matching the selected criteria</Typography>
    return <ResultsTable
        filteredDedupes={filteredDedupes}
        changeResolutionMethod={changeResolutionMethod}
        setResolutionValue={setResolutionValue}
        resolveDedupe={resolveDedupe}
        unresolveDedupe={unresolveDedupe}
    />;
}