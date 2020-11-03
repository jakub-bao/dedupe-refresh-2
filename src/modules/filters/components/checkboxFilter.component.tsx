import React from "react";
import {Checkbox, FormControlLabel} from "@material-ui/core";

export default function CheckboxFilter({checked, label, onChange}:{checked:boolean, label:string, onChange:()=>void}) {
    return <FormControlLabel
        control={<Checkbox checked={checked} onChange={onChange} id={`cypress_${label.replace(' ','')}`}/>}
        label={label}
    />;
}