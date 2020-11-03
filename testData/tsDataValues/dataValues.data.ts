
export type DedupeValue = {
    value: number;
    attributeCategoryOption: string;
}

export type DedupeValueSet = {
    dataElement: string;
    attributeCategoryCombo: string;
    categoryOptionCombo: string;
    orgUnitId: string;
    dataValues: DedupeValue[];
}

const Nigeria1:DedupeValueSet = {
    dataElement: "FI2s716RRZc",
    attributeCategoryCombo: "wUpfppgjEza",
    categoryOptionCombo: "inrjeyWelOD",
    orgUnitId: 'BY7bSKwPjPJ',
    dataValues: [{
        value: 20010,
        attributeCategoryOption: 'nwyMXmV0vPR'
    },{
        value: 20020,
        attributeCategoryOption: 'EqCzVuUpqZW'
    },{
        value: 0,
        attributeCategoryOption: 'xEzelmtHWPn'
    }]
};

const Nigeria2:DedupeValueSet = {
    dataElement: "qhGxKnmrZBd",
    attributeCategoryCombo: "wUpfppgjEza",
    categoryOptionCombo: "NMYN9FAPqWa",
    orgUnitId: 'p7M264Wg1qB',
    dataValues: [{
        value: 30010,
        attributeCategoryOption: 'gBvOZlOT7vE'
    },{
        value: 30020,
        attributeCategoryOption: 'SnYYwQ0MNdg'
    },{
        value: -30010,
        attributeCategoryOption: 'xEzelmtHWPn'
    }]
};

const Rwanda1:DedupeValueSet = {
    dataElement: "qhGxKnmrZBd",
    attributeCategoryCombo: "wUpfppgjEza",
    categoryOptionCombo: "xYyVHiXrvSi",
    orgUnitId: 'TAPALAZae2l',
    dataValues: [{
        value: 10010,
        attributeCategoryOption: 'wXNP2RRZqbj'
    },{
        value: 10030,
        attributeCategoryOption: 'xAQyTl7eVuo'
    }]
};

const Rwanda2:DedupeValueSet = {
    dataElement: "qhGxKnmrZBd",
    attributeCategoryCombo: "wUpfppgjEza",
    categoryOptionCombo: "nEKvoyX7K7X",
    orgUnitId: 'TAPALAZae2l',
    dataValues: [{
        value: 10020,
        attributeCategoryOption: 'wXNP2RRZqbj'
    },{
        value: 10040,
        attributeCategoryOption: 'xAQyTl7eVuo'
    }]
};

export const dedupeValueSets:DedupeValueSet[] = [Nigeria1,Nigeria2,Rwanda1,Rwanda2];