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
    sectionDisabled:{
        // opacity: 0.5
    },
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
        margin: '8px 3px 8px',
        display:'block'
    }
};

function Section({title,children, disabled}:{title:string, children:any, disabled?:boolean}){
    return <div style={Object.assign({},styles.section,disabled?styles.sectionDisabled:null)}>
        <Typography style={styles.sectionTitle}>{title}</Typography>
        {children}
    </div>
}

function Button({title, tooltip, ...props}){
    const inside = <MuiButton style={styles.button} size='small' {...props}>
        {title}
    </MuiButton>;
    if (props.disabled) return inside;
    else return <Tooltip title={tooltip}>
        {inside}
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
export type BatchExecute = ()=>void;

export function BatchResolveMenu({batchStats, batchSelect, batchMethod, batchExecute}:{
    batchStats:BatchStatsModel,
    batchSelect:BatchSelect,
    batchMethod:BatchMethod,
    batchExecute:BatchExecute
}){
    return <React.Fragment>
        <Section title='Status'>
            <BatchStats batchStats={batchStats}/>
        </Section>
        <Section title='Selection'>
            <Button title={'Select everything'} tooltip={'Select all dedupes on all pages that match the current search'} onClick={()=>batchSelect(SelectionType.allMatching)} disabled={batchStats.selectedCount===batchStats.allCount} data-testid='batch_selectAll'/>
            <Button title={'Select this page'} tooltip={'Add this page of dedupes to existing selection'} onClick={()=>batchSelect(SelectionType.onlyOnPage)} data-testid='batch_selectPage'/>
            <Button title={'Unselect all'} tooltip={'Unselect all dedupes'} onClick={()=>batchSelect(SelectionType.none)} disabled={batchStats.selectedCount===0} data-testid='batch_selectNone'/>
        </Section>

        <Section title='Method' disabled={batchStats.selectedCount===0}>
            <Button title={'Set to maximum'} tooltip={'Set resolution to maximum for all selected dedupes'} onClick={()=>batchMethod(ResolutionMethodType.maximum)} data-testid='batch_method_max' disabled={batchStats.selectedCount===0||batchStats.selectedCount===batchStats.maximum}/>
            <Button title={'Set to sum'} tooltip={'Set resolution to sum for all selected dedupes'} onClick={()=>batchMethod(ResolutionMethodType.sum)} data-testid='batch_method_sum' disabled={batchStats.selectedCount===0||batchStats.selectedCount===batchStats.sum}/>
            <Button title={'Set to unresolved'} tooltip={'Unset resolution method for selected dedupes'} onClick={()=>batchMethod(null)} data-testid='batch_method_unset' disabled={batchStats.selectedCount===0||(batchStats.readyToResolve===0&&batchStats.alreadyResolved===0)}/>
        </Section>

        <Section title='Action' disabled={batchStats.selectedCount===0}>
            <Button title={'Execute'} tooltip={'Save and upload the chosen resolution for all selected dedupes'} onClick={()=>batchExecute()} data-testid='batch_action_resolve' disabled={batchStats.readyToResolve===0&&batchStats.readyToUnresolve===0} color='secondary' /*variant='outlined'*/ variant={'contained'} disableElevation/>
        </Section>
    </React.Fragment>
}