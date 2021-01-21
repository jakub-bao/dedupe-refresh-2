import React, {Ref} from "react";
import {IconButton, withStyles} from "@material-ui/core";
import {SnackbarProvider as MuiSnackbarProvider} from "notistack";
import {CheckCircle, Close} from "@material-ui/icons";
import {colors} from "../../../values/color.values";

const styles = {
    icon: {
        width: 20,
        marginInlineEnd: 8
    }
};

const SnackbarProvider = withStyles({
    root:{
        top: 33
    },
    variantSuccess: {backgroundColor: colors.success+'!important'},
    variantError: {backgroundColor: colors.alert+'!important'},
})(MuiSnackbarProvider);

const notistackRef = React.createRef();
const onClickDismiss = key => () => {
    // @ts-ignore
    notistackRef.current.closeSnackbar(key);
}

export default function MessageProvider({children}:{children:any}) {
    return <SnackbarProvider
        hideIconVariant={true}
        ref={notistackRef as Ref<MuiSnackbarProvider>}
        autoHideDuration={700000}
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