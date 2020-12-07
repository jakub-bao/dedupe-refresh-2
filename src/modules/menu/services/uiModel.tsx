import {MenuVariant} from "../components/menu.component";

export enum UiActionType{
    loadingResults,
    loadingFilters,
    errorResults,
    errorFilters,
    unresolveConfirm,
    menuOpen,
    batchOpen,
}

export type ActionValue = {
    action:UiActionType, value:boolean
};

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

export function updateUi(ui:UiModel, actions: ActionValue[]){
    actions.forEach(actionValue=>{
        let action = actionValue.action;
        let value = actionValue.value;
        switch (action){
            case UiActionType.loadingResults:
                ui.loading.results = value; break;
            case UiActionType.loadingFilters:
                ui.loading.filters = value; break;
            case UiActionType.errorResults:
                ui.error.results = value; break;
            case UiActionType.errorFilters:
                ui.error.filters = value; break;
            case UiActionType.unresolveConfirm:
                ui.unresolveConfirmOpen = value; break;
            case UiActionType.menuOpen:
                ui.menu.open = value; break;
            case UiActionType.batchOpen:
                ui.menu.batchOpen = value; break;
        }
    });
    return ui;
}