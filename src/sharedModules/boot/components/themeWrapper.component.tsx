import React from "react";
import {ThemeProvider} from "@material-ui/styles";
import {createGenerateClassName, createMuiTheme, StylesProvider} from "@material-ui/core/styles";

import "../css/themeWrapper.component.css";
import {PositionProperty} from "csstype";
import {colors} from "../../shared/values/color.values";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: colors.primaryDatim
        },
        secondary: {
            main: '#f50057'
        },
        error:{
            main: '#D72638'
        }
    },
});

const styles = {
    wrapper: {
        margin: 0,
        position: 'relative' as PositionProperty,
        top: 48
    }
};

const generateClassName = createGenerateClassName({
    productionPrefix: 'withStyles',
});

export default function ThemeWrapper({children}) {
    return (
        <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
            <div style={styles.wrapper}>
                {children}
            </div>
        </ThemeProvider>
        </StylesProvider>
    );
}