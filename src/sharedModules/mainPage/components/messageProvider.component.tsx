import React, {Ref} from "react";
import {IconButton, withStyles} from "@material-ui/core";
import {SnackbarProvider as MuiSnackbarProvider} from "notistack";
import {CheckCircle, Close, KeyboardReturn} from "@material-ui/icons";

const styles = {
    icon: {
        width: 20,
        marginInlineEnd: 8
    }
};

const SnackbarProvider = withStyles({
    root:{
        top: 33
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
        autoHideDuration={7000000}
        maxSnack={4}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        action={(key) => (
            <IconButton onClick={onClickDismiss(key)}>
                <Close />
            </IconButton>
        )}
        iconVariant={{
            warning: <CheckCircle style={styles.icon}/>,
        }}
    >
        {children}
    </SnackbarProvider>
}