import React from "react";
import {DedupeModel, getDedupeStatus} from "../../results/models/dedupe.model";

export default function StatusCell({dedupe}:{dedupe:DedupeModel}) {
    return <div>{getDedupeStatus(dedupe)}</div>;
}