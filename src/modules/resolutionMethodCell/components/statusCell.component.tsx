import React, {CSSProperties} from "react";
import {DedupeModel, getDedupeStatus} from "../../results/models/dedupe.model";

const styles = {
    root: {

    } as CSSProperties
};

export default function StatusCell({dedupe}:{dedupe:DedupeModel}) {
    return <div style={styles.root}>{getDedupeStatus(dedupe)}</div>;
}