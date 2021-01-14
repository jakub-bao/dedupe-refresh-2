import React, {Ref} from "react";
import {IconButton, withStyles} from "@material-ui/core";
import {SnackbarProvider as SBP} from "notistack";
import {Close} from "@material-ui/icons";
import Main from "../../../modules/main/components/main.component";
import ThemeWrapper from "../../boot/components/themeWrapper.component";

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


export default function MessageProvider({children}:{children:any}) {
    return <SnackbarProvider
        ref={notistackRef as Ref<SBP>}
        autoHideDuration={7000}
        maxSnack={4}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        action={(key) => (
            // <Button onClick={onClickDismiss(key)}>
            //     Dismiss
            // </Button>
            <IconButton onClick={onClickDismiss(key)}>
                <Close />
            </IconButton>
        )}
    >
        {children}
    </SnackbarProvider>
}