import React, {Ref} from "react";
import {IconButton, withStyles} from "@material-ui/core";
import {SnackbarProvider as MuiSnackbarProvider} from "notistack";
import {Close} from "@material-ui/icons";

const SnackbarProvider = withStyles({
    root:{
        top: 46
    }
})(MuiSnackbarProvider);

const notistackRef = React.createRef();
const onClickDismiss = key => () => {
    // @ts-ignore
    notistackRef.current.closeSnackbar(key);
}


export default function MessageProvider({children}:{children:any}) {
    return <SnackbarProvider
        ref={notistackRef as Ref<MuiSnackbarProvider>}
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