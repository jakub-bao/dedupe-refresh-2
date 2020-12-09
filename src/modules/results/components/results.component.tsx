import React from "react";
import {DedupeModel} from "../models/dedupe.model";
import ResultsTable, {OnPageChange} from "./resultsTable.component";
import {Typography} from "@material-ui/core";
import {
    ChangeResolutionMethod,
    SetResolutionValue
} from "../../resolutionMethodCell/components/resolutionMethodCell.component";
import {ResolveDedupe, UnresolveDedupe} from "../../resolutionMethodCell/components/statusCell.component";
import MaterialTable from "material-table";

const styles = {
    info: {
        margin: '30px 5px'
    }
};

export default function Results({filteredDedupes,setResolutionValue, changeResolutionMethod, resolveDedupe, unresolveDedupe,onSelectChange,onPageChange}:{
    filteredDedupes: DedupeModel[],
    setResolutionValue:SetResolutionValue,
    changeResolutionMethod: ChangeResolutionMethod,
    resolveDedupe: ResolveDedupe,
    unresolveDedupe: UnresolveDedupe,
    onSelectChange: ()=>void,
    onPageChange:OnPageChange
}) {
    if (!filteredDedupes) return null;
    if (filteredDedupes.length===0) return <Typography style={styles.info}>No duplicates found matching the selected criteria</Typography>
    return <ResultsTable
        filteredDedupes={filteredDedupes}
        changeResolutionMethod={changeResolutionMethod}
        setResolutionValue={setResolutionValue}
        resolveDedupe={resolveDedupe}
        unresolveDedupe={unresolveDedupe}
        onSelectChange={onSelectChange}
        onPageChange={onPageChange}
    />;
}