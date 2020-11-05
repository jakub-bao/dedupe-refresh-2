
export type DedupeValue = {
    value: number;
    categoryOption_cp: string;  // Mechanism
    dataElement_de: string; // DataElemnt
    categoryOptionCombo_co: string; // Age Group / Sex Group
}

export type DedupeValueSet = {
    dataSet: string;
    period: string;
    orgUnitId: string;
    dataValues: DedupeValue[];
}

// Pure dedupe, across mechanisms, unresolved
const Rwanda1:DedupeValueSet = {
    orgUnitId: 'TAPALAZae2l',
    dataSet: 'qzVASYuaIey',
    period: '2020Q2',
    dataValues: [{
        value: 10010,
        categoryOption_cp: 'wXNP2RRZqbj',
        dataElement_de: "qhGxKnmrZBd",
        categoryOptionCombo_co: "xYyVHiXrvSi",
    },{
        value: 10030,
        categoryOption_cp: 'xAQyTl7eVuo',
        dataElement_de: "qhGxKnmrZBd",
        categoryOptionCombo_co: "xYyVHiXrvSi",
    }]
};

// Pure dedupe, across mechanisms, unresolved
const Rwanda2:DedupeValueSet = {
    orgUnitId: 'TAPALAZae2l',
    dataSet: 'qzVASYuaIey',
    period: '2020Q2',
    dataValues: [{
        value: 10020,
        categoryOption_cp: 'wXNP2RRZqbj',
        dataElement_de: "qhGxKnmrZBd",
        categoryOptionCombo_co: "nEKvoyX7K7X",
    },{
        value: 10040,
        categoryOption_cp: 'xAQyTl7eVuo',
        dataElement_de: "qhGxKnmrZBd",
        categoryOptionCombo_co: "nEKvoyX7K7X",
    }]
};

// Pure dedupe, across mechanisms, resolved as sum
const Nigeria1:DedupeValueSet = {
    orgUnitId: 'BY7bSKwPjPJ',
    dataSet: 'qzVASYuaIey',
    period: '2020Q2',
    dataValues: [{
        value: 20010,
        categoryOption_cp: 'nwyMXmV0vPR',
        dataElement_de: 'FI2s716RRZc',
        categoryOptionCombo_co: "inrjeyWelOD",
    },{
        value: 20020,
        categoryOption_cp: 'EqCzVuUpqZW',
        dataElement_de: 'FI2s716RRZc',
        categoryOptionCombo_co: "inrjeyWelOD",
    },{
        value: 0,
        categoryOption_cp: 'xEzelmtHWPn',
        dataElement_de: 'FI2s716RRZc',
        categoryOptionCombo_co: "inrjeyWelOD",
    }]
};

// Pure dedupe, across mechanisms, resolved as max
const Nigeria2:DedupeValueSet = {
    orgUnitId: 'p7M264Wg1qB',
    dataSet: 'qzVASYuaIey',
    period: '2020Q2',
    dataValues: [{
        value: 30010,
        categoryOption_cp: 'gBvOZlOT7vE',
        dataElement_de: "qhGxKnmrZBd",
        categoryOptionCombo_co: "NMYN9FAPqWa",
    },{
        value: 30020,
        categoryOption_cp: 'SnYYwQ0MNdg',
        dataElement_de: "qhGxKnmrZBd",
        categoryOptionCombo_co: "NMYN9FAPqWa",
    },{
        value: -30010,
        categoryOption_cp: 'xEzelmtHWPn',
        dataElement_de: "qhGxKnmrZBd",
        categoryOptionCombo_co: "NMYN9FAPqWa",
    }]
};

// const Zambia1:DedupeValueSet = {
//     dataSet: 'jKdHXpBfWop',
//     orgUnitId: 'ivv9yPgimic',
//     period: '2020Q3',
//     dataValues: [{
//         value: 40010,
//         cp: 'PHHHN8hDekc',
//         categoryOptionCombo_co: "pWaGXt8b4rt",
//         de: 'cRCw63EQEbM',
//     },{
//         value: 40020,
//         cp: 'EqCzVuUpqZW',
//         categoryOptionCombo_co: "pWaGXt8b4rt",
//         de: 'TiMvlchPiPH',
//     }]
// }

export const dedupeValueSets:DedupeValueSet[] = [Nigeria1,Nigeria2,Rwanda1,Rwanda2];