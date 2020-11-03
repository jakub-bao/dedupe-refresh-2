import {Button, List, ListItem, ListItemText, Paper, Typography} from "@material-ui/core";
import React, {CSSProperties} from "react";

const styles = {
    root: {
        padding: 15,
        width: 700,
        margin: '70px auto'
    },
    emph: {
        textDecoration: 'underline'
    },
    bold:{
        fontWeight: 500
    },
    dashboard: {
        float: 'right',
    } as CSSProperties
};

function Emph({children}){
    return <span style={styles.emph}>{children}</span>
}

export function CantUse(){
    return <Paper style={styles.root}>
        <Typography variant='h5'>Access Denied</Typography>
        <Typography>Only the following users can use <span style={styles.bold}>ERB Processor</span>:</Typography>
        <List dense={true}>
            <ListItem>
                <ListItemText>
                    <Emph>Partner</Emph> users with <Emph>ER Data Entry</Emph> privileges
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>
                    <Emph>Agency</Emph> users with <Emph>ER Data Access</Emph> privileges
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>
                    <Emph>Global Agency</Emph> users with <Emph>ER Data Access</Emph> privileges
                </ListItemText>
            </ListItem>
        </List>
        <Typography>
            The user you are attempting to view this app with does not have the appropriate permissions.<br/> If you feel you've received this message in error please contact DATIM Support.
        </Typography>
        <Button style={styles.dashboard} href='/'>Go to Dashboard</Button>
        <div style={{clear: 'both'} as CSSProperties}/>
    </Paper>
}