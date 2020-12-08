import React, {CSSProperties} from "react";
import {Button as MuiButton, Paper, Tooltip, Typography} from "@material-ui/core";

export type BatchStats = {
    selected: number;
}

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

function Button({title, tooltip}){
    return <Tooltip title={tooltip}>
        <MuiButton style={styles.button} size='small'>
            {title}
        </MuiButton>
    </Tooltip>
}

export function BatchResolveMenu({batchStats}:{batchStats:BatchStats}){
    return <React.Fragment>
        <Section title='Selection'>
            <Button title={'Select all on this page'} tooltip={'Select only the dedupes that are currently visible on this page'}/>
            <Button title={'Select everything'} tooltip={'Select all dedupes on all pages that match the current search'}/>
            <Button title={'Select none'} tooltip={'Unselect all dedupes'}/>
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