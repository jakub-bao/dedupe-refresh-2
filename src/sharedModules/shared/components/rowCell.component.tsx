import {TableCell, TableRow, withStyles} from "@material-ui/core";
import {CSSProperties} from "@material-ui/core/styles/withStyles";
import {colors} from "../../../values/color.values";

export const cellStyles:CSSProperties={
    duns: {width:150},
    file: {},
    status: {width: 100},
    interventions: {width: 30},
    amount: {width:90},
    actions: {width:30},
    na: {color: colors.lightText}
};


export const Cell = withStyles((theme) => ({
    head: {
        backgroundColor: colors.primaryDatim,
        color: colors.primaryDatimText,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

export const Row = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: colors.backgroundSecondary,
        },
    },
}))(TableRow);
