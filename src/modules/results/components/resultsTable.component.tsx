import React from "react";
import MaterialTable, {MTableBodyRow, MTablePagination, Options} from "material-table";
import {DedupeModel} from "../models/dedupe.model";
import ResolutionMethodCell from "../../resolutionMethodCell/components/resolutionMethodCell.component";
import {tableIcons} from "./resultTableIcons.component";
import {DuplicateList} from "./duplicateList.component";
import { colors } from "../../../values/color.values";
import {withStyles} from "@material-ui/core";
import StatusCell from "../../resolutionMethodCell/components/statusCell.component";

const noSort = {sorting: false};
const padding = '5px';
const border = '1px solid #00000021';
const darkBorder = `1px solid rgba(0,0,0,0.3)`;
const lightBorder = `1px solid rgba(0,0,0,0.075)`;
const fontFamily ='"Roboto", "Helvetica", "Arial", sans-serif';
const fontSize = '0.875rem'


const tableOptions:Options<DedupeModel> = {
    pageSize: 20,
    pageSizeOptions: [20, 50, 100],
    selection: true,
    emptyRowsWhenPaging: false,
    thirdSortClick: false,
    padding: 'dense',
    toolbar: false,
    headerStyle: {
        backgroundColor: 'rgb(223,223,223)',
        borderRight: darkBorder,
        borderBottom: darkBorder,
    }
} as Options<DedupeModel>;

export const Row = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: colors.backgroundSecondary,
        }
    },
}))(MTableBodyRow);


const components = {
    Container:props=>(<div {...props}/>),
    Row,
};

const columnSettings = [
    {title: 'Data Element', field: 'info.dataElementName', cellStyle: {padding,fontFamily,fontSize, borderLeft: lightBorder}},
    {title: 'Disaggregation', field: 'data.disAggregation', cellStyle: {padding,fontFamily,fontSize, borderLeft: lightBorder}},
    {title: 'OU', field: 'info.orgUnitName', cellStyle: {padding, borderRight: border,fontFamily,fontSize, borderLeft: lightBorder}},
    {title: 'Duplicates', render: (dedupe:DedupeModel)=><DuplicateList duplicates={dedupe.duplicates}/>, ...noSort, cellStyle: {padding:0,borderRight:border}},
    {title: 'Resolution', render: (dedupe:DedupeModel)=><ResolutionMethodCell dedupe={dedupe}/>, ...noSort, cellStyle: {padding}},
    // {title: 'Status', render: (dedupe:DedupeModel)=><StatusCell dedupe={dedupe}/>, ...noSort, cellStyle: {padding}}
];

export default function ResultsTable({filteredDedupes}:{filteredDedupes: DedupeModel[]}) {
    return <MaterialTable
        style={{borderTop: border}}
        icons={tableIcons}
        options={tableOptions}
        columns={columnSettings}
        data={filteredDedupes}
        components={components}
    />;
}