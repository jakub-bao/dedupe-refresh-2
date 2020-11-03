import React from "react";

export enum ArrowType {
    up='up',
    down='down'
}

const styles = {
    root: {
        opacity: 0.3,
        zoom: 0.4,
    }
}

function getCss(type: ArrowType):object{
    return Object.assign({},styles.root,{transform: `scaleY(${type===ArrowType.up?1:-1})`})
}

export default function Arrow({type}:{type:ArrowType}) {
    return <img style={getCss(type)} src={'img/arrow.png'} alt='arrow'/>;
}