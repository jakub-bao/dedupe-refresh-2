
export enum UiActionType{
    loadingResults,
    loadingFilters,
    errorResults,
    errorFilters,
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
    menuTab: MenuVariant
};

export type UiModel = {
    menu: MenuUi,
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
            }
        } else {
            ui.menu.menuTab = value;
        }
    });
    return ui;
}