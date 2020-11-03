import React, {ReactNode} from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core/styles';

import "./themeWrapper.component.css";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgb(39, 102, 150)'
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
    root: {
    }
};

export default function ThemeWrapper({children}:{children:ReactNode}) {
    return (
        <ThemeProvider theme={theme}>
            <div style={styles.root}>
                {children}
            </div>
        </ThemeProvider>
    );
}