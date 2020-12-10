import React, {CSSProperties} from "react";
import {Button as MuiButton, Tooltip, Typography} from "@material-ui/core";
import {ResolutionMethodType} from "../../results/models/dedupe.model";
import BatchStats from "../../batch/components/batchStats.component";
import {BatchStatsModel} from "../../batch/services/generateBatchStats.service";

const styles = {
    section: {
        border: '1px solid #80808047',
        position: 'relative',
        marginTop: 10,
        marginBottom: 5,
        padding: 4,
        color: 'rgba(0,0,0,0.6)'
    } as CSSProperties,
    sectionTitle: {
        fontSize: 13,
        position: 'absolute',
        top: -10,
        left: 6,
        backgroundColor: '#f3f3f3',
        paddingLeft: 3,
        paddingRight: 3
    } as CSSProperties,
    button:{
        padding: '2px 5px',
        marginTop: 4,
        display:'block'
    }
};

function Section({title,children}){
    return <div style={styles.section}>
        <Typography style={styles.sectionTitle}>{title}</Typography>
        {children}
    </div>
}

function Button({title, tooltip, ...props}){
    return <Tooltip title={tooltip}>
        <MuiButton style={styles.button} size='small' {...props}>
            {title}
        </MuiButton>
    </Tooltip>
}

export enum SelectionType {
    onlyOnPage='onlyOnPage',
    allMatching='allMatching',
    none='none'
}

export enum BatchActionType {
    resolve='resolve',
    unresolve='unresolve'
}

export type BatchSelect = (selection:SelectionType)=>void;
export type BatchMethod = (method:ResolutionMethodType)=>void;
export type BatchAction = (action:BatchActionType)=>void;

export function BatchResolveMenu({batchStats, batchSelect, batchMethod, batchAction}:{
    batchStats:BatchStatsModel,
    batchSelect:BatchSelect,
    batchMethod:BatchMethod,
    batchAction:BatchAction
}){
    return <React.Fragment>
        <Section title='Overview'>
            <BatchStats batchStats={batchStats}/>
        </Section>
        <Section title='Selection'>
            <Button title={'Select everything'} tooltip={'Select all dedupes on all pages that match the current search'} onClick={()=>batchSelect(SelectionType.allMatching)} disabled={batchStats.selectedCount===batchStats.allCount} data-testid='batch_selectAll'/>
            <Button title={'Select this page'} tooltip={'Add this page of dedupes to existing selection'} onClick={()=>batchSelect(SelectionType.onlyOnPage)} data-testid='batch_selectPage'/>
            <Button title={'Unselect all'} tooltip={'Unselect all dedupes'} onClick={()=>batchSelect(SelectionType.none)} disabled={batchStats.selectedCount===0} data-testid='batch_selectNone'/>
        </Section>
        <Section title='Method'>
            <Button title={'Set to maximum'} tooltip={'Set resolution to maximum for all selected dedupes'}/>
            <Button title={'Set to sum'} tooltip={'Set resolution to sum for all selected dedupes'}/>
        </Section>
        <Section title='Action'>
            <Button title={'Resolve'} tooltip={'Save and upload the chosen resolution for all selected dedupes'}/>
            <Button title={'Unresolve'} tooltip={'Delete the resolutions for all selected dedupes from DATIM'}/>
        </Section>
    </React.Fragment>
}