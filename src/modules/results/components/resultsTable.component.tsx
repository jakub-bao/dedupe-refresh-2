import React, {CSSProperties} from "react";
import MaterialTable, {Column, MTableBodyRow, Options} from "material-table";
import {DedupeModel, InternalStatus} from "../models/dedupe.model";
import {tableIcons} from "./resultTableIcons.component";
import {ColWidths, DuplicateList} from "./duplicateList.component";
import {colors} from "../../../values/color.values";
import {Table, TableBody, TableCell, TableRow, withStyles} from "@material-ui/core";
import {
    ChangeResolutionMethod,
    ResolutionMethodCell,
    SetResolutionValue
} from "../../resolutionMethodCell/components/resolutionMethodCell.component";
import StatusCell, {
    ResolveDedupe,
    statusToText,
    UnresolveDedupe
} from "../../resolutionMethodCell/components/statusCell.component";
import "./resultsTable.component.css";
import {isTestEnv} from "../../../test/apiCache/apiCache.index";
import RespText from "../../../sharedModules/shared/components/responsiveText.component";

const padding = '5px';
const border = '1px solid #00000021';
const darkBorder = `1px solid rgba(0,0,0,0.3)`;
const lightBorder = `1px solid rgba(0,0,0,0.075)`;

const styles = {
    columnHeader: {
        padding: '6px'
    },
    tableColumn:{
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: '0.875rem',
        borderLeft: lightBorder,
        padding: '6px 7px',
        height: 130
    },
    duplicatesColumn:{
        padding: 0
    },
    resolutionColumn:{
        padding: 5
    }
};

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
    },
    draggable: false,
    selectionProps: (data:DedupeModel)=>({'data-testid':`batch_checkbox_${data.meta.internalId}`,'data-id':data.meta.internalId,'data-type':'batch_checkbox'}),
    headerSelectionProps: {'data-testid':'batch_checkbox_all'}
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

function statusToColor(status:InternalStatus):string{
    switch (status){
        case InternalStatus.unresolved: return '#00000000';
        case InternalStatus.readyToResolve:
        case InternalStatus.readyToUnresolve:
            return '#9C0D38';
        case InternalStatus.resolvedOnServer: return '#307351';
        case InternalStatus.processing: return '#E8C547';
        case InternalStatus.invalidValue: return '#A4BAB7';
    }
}

function getStatusCellStyle(dedupe:DedupeModel):CSSProperties{
    return {
        padding,
        borderLeft: lightBorder,
        backgroundColor: statusToColor(dedupe.status),
    }as CSSProperties;
}

const Cell = withStyles(()=>({
    root: {
        fontWeight: 500,
        padding: 6,
        borderRight: `1px solid rgba(0,0,0,0.08)`,
        height: 30,
        '&:last-child':{
            paddingRight: 6,
            borderRight: 0
        }
    }
}))(TableCell);

const DuplicatesHeader = <Table size="small">
    <ColWidths/>
    <TableBody>
        <TableRow>
            <Cell>Agency</Cell><Cell>Partner</Cell><Cell>Mech</Cell><Cell>Value</Cell>
        </TableRow>
    </TableBody>
</Table>



const includes = (field:string, token:string)=>field.toLowerCase().includes(token.toLowerCase());

const mergeStyles = (...styles)=>Object.assign({},...styles);

const getColumnSettings = (setResolutionValue:SetResolutionValue, changeResolutionMethod:ChangeResolutionMethod, resolveDedupe: ResolveDedupe, unresolveDedupe: UnresolveDedupe)=> [
    {
        title: <RespText long='Data Element' short='DE' cutoff={980}/>,
        field: 'info.dataElementName',
        cellStyle: styles.tableColumn,
        headerStyle: styles.columnHeader,
    } as Column<any>, {
        title: <RespText long='Disaggregation' short='Disaggreg' cutoff={1200}/>,
        field: 'data.disAggregation',
        cellStyle: styles.tableColumn,
        headerStyle: styles.columnHeader,
    }, {
        title: <RespText long='Org Unit' short='OU' cutoff={1300}/>,
        field: 'info.orgUnitName',
        cellStyle: styles.tableColumn,
        headerStyle: styles.columnHeader,
    }, {
        title: DuplicatesHeader,
        render: (dedupe:DedupeModel)=><DuplicateList duplicates={dedupe.duplicates}/>,
        sorting: false,
        cellStyle: mergeStyles(styles.tableColumn, styles.duplicatesColumn),
        headerStyle: styles.duplicatesColumn
    } as any as Column<any>, {
        title: 'Resolution',
        render: (dedupe:DedupeModel)=><ResolutionMethodCell dedupe={dedupe} changeResolutionMethod={changeResolutionMethod} setResolutionValue={setResolutionValue}/>,
        sorting: false,
        cellStyle: mergeStyles(styles.tableColumn, styles.resolutionColumn),
        headerStyle: styles.columnHeader,
    }, {
        title: 'Status',
        headerStyle: styles.columnHeader,
        render: (dedupe:DedupeModel)=><StatusCell dedupe={dedupe} resolveDedupe={resolveDedupe} unresolveDedupe={unresolveDedupe}/>,
        cellStyle: (all, dedupe)=>getStatusCellStyle(dedupe),
        customFilterAndSearch: (token:string, data:DedupeModel)=>includes(statusToText(data.status),token),
    }
];


export default function ResultsTable({filteredDedupes, setResolutionValue, changeResolutionMethod, resolveDedupe, unresolveDedupe,onSelectChange}:{
    filteredDedupes: DedupeModel[],
    setResolutionValue:SetResolutionValue,
    changeResolutionMethod: ChangeResolutionMethod,
    resolveDedupe:ResolveDedupe,
    unresolveDedupe:UnresolveDedupe,
    onSelectChange: ()=>void,
}) {
    tweakTable();
    return <MaterialTable
        style={{borderTop: border}}
        icons={tableIcons}
        options={tableOptions}
        columns={getColumnSettings(setResolutionValue, changeResolutionMethod, resolveDedupe, unresolveDedupe)}
        data={filteredDedupes}
        components={components}
        onSelectionChange={onSelectChange}
    />;
}

function tweakTable() {
    setTimeout(() => {
        if (isTestEnv()) return;
        if (document.querySelector('#resultsTableColgroup')) return;
        let colSettings = document.createElement('colgroup');
        colSettings.setAttribute('id','resultsTableColgroup');
        [1, 20, 10, 10, 40, 10,10].forEach(width => {
            let col = document.createElement('col');
            col.setAttribute('span', "1");
            col.setAttribute('style', `width: ${width}%`);
            colSettings.appendChild(col);
        });
        let table = document.querySelector('.MuiTable-root')
        table.insertBefore(colSettings, table.firstChild);
    }, 50);
}