import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

export function UnresolveConfirm({isOpen, onClose}:{isOpen: boolean, onClose: (boolean)=>void}){
    return <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"        aria-describedby="alert-dialog-description"
    >
        <DialogTitle>Unresolve</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Let Google help apps determine location. This means sending anonymous location data to
                Google, even when no apps are running.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={()=>onClose(false)}>
                Cancel
            </Button>
            <Button onClick={()=>onClose(true)} color="primary" autoFocus>
                Agree
            </Button>
        </DialogActions>
    </Dialog>
}