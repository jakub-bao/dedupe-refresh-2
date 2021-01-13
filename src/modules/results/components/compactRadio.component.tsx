import {Radio} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles({
    root: {
        padding: 5,
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: '50%',
        width: 14,
        height: 14,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.49), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        'input:hover ~ &': {
            backgroundColor: '#3d6d8a42'
        },
    },

    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 14,
            height: 14,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#137cbd',
        },
    },
});

export function CompactRadio({testId, ...props}:{testId:string}) {
    const classes = useStyles();
    return (
        <Radio
            className={classes.root}
            inputProps={{'data-testid':testId} as any}
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}