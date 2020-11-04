import React from "react";
import {Checkbox, FormControlLabel} from "@material-ui/core";

export default function CheckboxFilter({checked, label, onChange}:{checked:boolean, label:string, onChange:()=>void}) {
    return <FormControlLabel
        control={<Checkbox checked={checked} onChange={onChange}/>}
        data-testid={`filter_includeResolved`}
        label={label}
    />;
}