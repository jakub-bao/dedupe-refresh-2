import React from "react";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        '& .MuiTypography-root': {
            fontSize: 15
        }
    },
});

export default function CheckboxFilter({checked, label, onChange}:{checked:boolean, label:string, onChange:()=>void}) {
    const classes = useStyles();
    return <FormControlLabel
        control={<Checkbox checked={checked} onChange={onChange} color="primary" size='small'/>}
        data-testid={`filter_includeResolved`}
        label={label}
        className={classes.root}
    />;
}