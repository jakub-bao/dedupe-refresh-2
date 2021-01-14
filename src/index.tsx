import React, {Ref} from "react";
import {render} from "react-dom";
import {baseUrl} from "./sharedModules/shared/services/config.service";
import ThemeWrapper from "./sharedModules/boot/components/themeWrapper.component";
import "./index.css";
import {Provider} from "@dhis2/app-runtime";
import {HeaderBar} from '@dhis2/ui'
import FloatClear from "./sharedModules/shared/components/floatClear.component";
import Main from "./modules/main/components/main.component";
import {SnackbarProvider as SBP} from "notistack";
import {Button, withStyles} from "@material-ui/core";


const SnackbarProvider = withStyles({
    root:{
        top: 46
    }
})(SBP);

const notistackRef = React.createRef();
const onClickDismiss = key => () => {
    // @ts-ignore
    notistackRef.current.closeSnackbar(key);
}

function Index(){
    return <Provider config={{baseUrl: baseUrl, apiVersion: 33}}>
        <div id='dhis2HeaderBar'>
            <HeaderBar/>
        </div>
        <ThemeWrapper>
            <SnackbarProvider
                ref={notistackRef as Ref<SBP>}
                autoHideDuration={7000}
                maxSnack={4}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                action={(key) => (
                    <Button onClick={onClickDismiss(key)}>
                        Dismiss
                    </Button>
                )}
            >
                <Main/>
            </SnackbarProvider>
        </ThemeWrapper>
        <FloatClear/>
        <br/>
    </Provider>;
}

render(<Index/>, document.getElementById('root'));
