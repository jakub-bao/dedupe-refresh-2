import React from "react";
import MaterialTable, {Options} from "material-table";
import {DedupeModel} from "../models/dedupe.model";
import ResolutionMethodCell from "../../resolutionMethodCell/components/resolutionMethodCell.component";
import {tableIcons} from "./resultTableIcons.component";
import {DuplicateList} from "./duplicateList.component";

const noSort = {sorting: false};
const padding = '5px 5px 5px 5px';
const borderRight = '1px solid #00000021';

const tableOptions:Options<DedupeModel> = {
    pageSize: 20,
    pageSizeOptions: [20, 50, 100],
    selection: true,
    emptyRowsWhenPaging: false,
    thirdSortClick: false,
    padding: 'dense',
    toolbar: false,
} as Options<DedupeModel>;



const columnSettings = [
    {title: 'Data Element', field: 'info.dataElementName', cellStyle: {padding}},
    {title: 'Disaggregation', field: 'data.disAggregation', cellStyle: {padding}},
    {title: 'Org Unit', field: 'info.orgUnitName', cellStyle: {padding, borderRight}},
    {title: 'Duplicates', render: (dedupe:DedupeModel)=><DuplicateList duplicates={dedupe.duplicates}/>, ...noSort, cellStyle: {padding,borderRight}},
    {title: 'Resolution', render: (dedupe:DedupeModel)=><ResolutionMethodCell dedupe={dedupe}/>, ...noSort, cellStyle: {padding}}
];

export default function ResultsTable({filteredDedupes}:{filteredDedupes: DedupeModel[]}) {
    return <MaterialTable
        icons={tableIcons}
        options={tableOptions}
        columns={columnSettings}
        data={filteredDedupes}
    />;
}