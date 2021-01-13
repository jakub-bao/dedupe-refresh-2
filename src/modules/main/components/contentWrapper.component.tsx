import React from "react";


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
