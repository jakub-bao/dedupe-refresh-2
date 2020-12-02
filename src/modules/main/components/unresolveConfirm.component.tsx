import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {DedupeModel} from "../../results/models/dedupe.model";

export function UnresolveConfirm({toBeUnresolved, isOpen, onClose}:{toBeUnresolved:DedupeModel, isOpen: boolean, onClose: (boolean)=>void}){
    if (!toBeUnresolved||!toBeUnresolved.resolution.resolutionMethodValue) return null;
    return <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"        aria-describedby="alert-dialog-description"
        data-testid='unresolveConfirmDialog'
    >
        <DialogTitle>Unresolve</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Do you want to unresolve the following Dedupe?
            </DialogContentText>
                <ul>
                    <li><DialogContentText><b>Data Element</b> {toBeUnresolved.info.dataElementName}</DialogContentText></li>
                    <li><DialogContentText><b>Organisation Unit</b> {toBeUnresolved.info.orgUnitName}</DialogContentText></li>
                    <li><DialogContentText><b>Currently resolved as</b> {toBeUnresolved.resolution.resolutionMethodValue.resolutionMethod}: {toBeUnresolved.resolution.resolutionMethodValue.resolutionValue}</DialogContentText></li>
                </ul>
        </DialogContent>
        <DialogActions>
            <Button onClick={()=>onClose(false)}>
                Cancel
            </Button>
            <Button onClick={()=>onClose(true)} color="secondary" autoFocus data-testid='unresolveConfirm'>
                Unresolve
            </Button>
        </DialogActions>
    </Dialog>
}