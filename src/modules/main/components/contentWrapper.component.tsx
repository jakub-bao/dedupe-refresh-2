import React from "react";
import {UiModel} from "../../menu/services/uiModel";


const styles = {
    root: {
        marginTop: 0,
        marginLeft: 193,
        marginRight: 0,
    }
};

export default function ContentWrapper({children}:{children:any}) {
    return <div style={styles.root}>
        {children}
    </div>;
}
