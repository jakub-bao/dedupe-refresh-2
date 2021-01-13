import React, {CSSProperties} from "react";
import {DedupeModel} from "../models/dedupe.model";
import ResultsTable from "./resultsTable.component";
import {Button, Typography} from "@material-ui/core";
import {
    ChangeResolutionMethod,
    SetResolutionValue
} from "../../resolutionMethodCell/components/resolutionMethodCell.component";
import {ResolveDedupe, UnresolveDedupe} from "../../resolutionMethodCell/components/statusCell.component";
import NoResults from "./noResults.component";

const styles = {
    root: {
        position: 'relative'
    } as CSSProperties,
    export: {
        position: 'absolute',
        bottom: 5,
        left: 5
    } as CSSProperties,
    // info: {
    //     margin: '30px 5px'
    // }
};

export default function Results({filteredDedupes,setResolutionValue, changeResolutionMethod, resolveDedupe, unresolveDedupe,onSelectChange,triggerExport}:{
    filteredDedupes: DedupeModel[],
    setResolutionValue:SetResolutionValue,
    changeResolutionMethod: ChangeResolutionMethod,
    resolveDedupe: ResolveDedupe,
    unresolveDedupe: UnresolveDedupe,
    onSelectChange: ()=>void,
    triggerExport: ()=>void
}) {
    if (!filteredDedupes) return null;
    if (filteredDedupes.length===0) return <NoResults/>
    return <div style={styles.root}>
        <ResultsTable
        filteredDedupes={filteredDedupes}
        changeResolutionMethod={changeResolutionMethod}
        setResolutionValue={setResolutionValue}
        resolveDedupe={resolveDedupe}
        unresolveDedupe={unresolveDedupe}
        onSelectChange={onSelectChange}
        />
        <Button style={styles.export} onClick={triggerExport}>Export as CSV</Button>
    </div>
}