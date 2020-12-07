
export enum UiActionType{
    loadingResults,
    loadingFilters,
    errorResults,
    errorFilters,
    unresolveConfirm,
    menuOpen,
    menuTab,
}

export enum MenuVariant {
    search=0,
    batch=1
}

export type ActionValue = {
    action:UiActionType, value:boolean|MenuVariant
};

export type MenuUi = {
    open: boolean,
    // batchOpen: boolean
    menuTab: MenuVariant
};

export type UiModel = {
    menu: MenuUi,
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
        if (typeof value ==="boolean"){
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
            }
        } else {
            ui.menu.menuTab = value;
        }
    });
    return ui;
}