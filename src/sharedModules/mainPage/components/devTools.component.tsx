import React, {CSSProperties} from "react";
import {Drawer, Typography} from "@material-ui/core";

const styles = {
    root: {
        position: 'fixed',
        bottom: 4,
        right: 9,
        zIndex: 10000,
        fontSize: 13
    } as CSSProperties
};

export default function DevTools({}:{}) {
    if (process.env.NODE_ENV === 'production') return null;
    return <div style={styles.root}>
        <Typography>
            v2.0.0-rc4
        </Typography>
    </div>;
}