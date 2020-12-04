import {MenuVariant} from "../components/menu.component";

export enum UiAction{
    loadingResults,
    loadingFilters,
    errorResults,
    errorFilters,
    unresolveConfirm,
    menuOpen,
    batchOpen,
}

export type UiModel = {
    menu: {
        open: boolean,
        batchOpen: boolean,
    },
    unresolveConfirmOpen: boolean,
    error: {
        filters?: boolean,
        results?: boolean
    },
    loading: {
        filters?: boolean,
        results?: boolean,
    },
};

export function updateUi(ui:UiModel, action: UiAction, value:boolean){
    switch (action){
        case UiAction.loadingResults:
            ui.loading.results = value; break;
        case UiAction.loadingFilters:
            ui.loading.filters = value; break;
        case UiAction.errorResults:
            ui.error.results = value; break;
        case UiAction.errorFilters:
            ui.error.filters = value; break;
        case UiAction.unresolveConfirm:
            ui.unresolveConfirmOpen = value; break;
        case UiAction.menuOpen:
            ui.menu.open = value; break;
        case UiAction.batchOpen:
            ui.menu.batchOpen = value; break;
    }
    return ui;
}