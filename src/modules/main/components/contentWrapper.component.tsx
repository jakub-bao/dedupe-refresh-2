import React from "react";
import {FiltersUiModel} from "../../filters/components/filtersUi.model";


const styles = {
    root: {
        marginTop: 10,
        marginLeft: 235,
        marginRight: 15,
        transition: 'margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    rootClosedFilters: {
        marginLeft: 15
    }
};

function Indent({filtersOpen, children}:{filtersOpen: boolean, children: any}){
    let finalStyle = Object.assign({}, styles.root, filtersOpen?{}:styles.rootClosedFilters);
    return <div style={finalStyle} id='cypress_results'>
        {children}
    </div>;
}

export default function ContentWrapper({filtersUi, children}:{filtersUi: FiltersUiModel, children:any}) {
    return <Indent filtersOpen={filtersUi.filtersOpen}>
        {children}
    </Indent>;
}