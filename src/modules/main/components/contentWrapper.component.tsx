import React from "react";
import {UiModel} from "../../menu/services/uiModel";


const styles = {
    root: {
        marginTop: 0,
        marginLeft: 221,
        marginRight: 0,
        transition: 'margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    rootClosedFilters: {
        marginLeft: 0
    }
};

function Indent({filtersOpen, children}:{filtersOpen: boolean, children: any}){
    let finalStyle = Object.assign({}, styles.root, filtersOpen?{}:styles.rootClosedFilters);
    return <div style={finalStyle}>
        {children}
    </div>;
}

function _ContentWrapper({ui, children}:{ui: UiModel, children:any}) {
    return <Indent filtersOpen={ui.menu.open}>
        {children}
    </Indent>;
}

export default React.memo(_ContentWrapper);