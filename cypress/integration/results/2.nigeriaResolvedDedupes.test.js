const sumResolvedDedupeInfo = [
    'HTS_RECENT (N, DSD, KeyPop/RTRI/HIVStatus): HIV',
    'PWID, Recent RTRI, Positive',
    'ab Aba North',
    'Abt Associates Inc.',
    'JSI Research And Training Institute, INC.',
    '14169',
    '14302',
    '20010',
    '20020',
    'USAID',
    'Maximum (20020)',
    'Sum (40030)'
];

const maxResolvedDedupeInfo = [
    'CATHOLIC CARITAS FOUNDATION O F NIGERIA',
    'APIN PUBLIC HEALTH INITIATIVE S LTD/GTE',
    '16848',
    '16850',
    '30010',
    '30020',
    'HHS/CDC',
    'Maximum (30020)',
    'Sum (60030)'
];

describe('Nigeria Resolved Dedupes', ()=> {
    before(() => {
        cy.loginAs('de-interAgency-nigeria');
        cy.goHome();
    });

    it('Should not see resolved dedupes', ()=>{
        cy.setFilter('organisationUnit', 'PqlFzhuPcF1');
        cy.setFilter('dataType', 'RESULTS');
        cy.setFilter('period', '2020Q2');
        cy.searchDedupes();
        cy.results().containsNotAll(sumResolvedDedupeInfo);
        cy.results().contains('No duplicates found matching the selected criteria');
    });

    it('Should be able to see SUM resolved dedupe', ()=>{
        cy.get('#cypress_IncludeResolved').click();
        cy.searchDedupes();
        cy.getResultByOrder(1).containsAll(sumResolvedDedupeInfo);
        cy.getResultByOrder(1).checkResolved('sum');
    });

    it('Should be able to see MAX resolved dedupe', ()=>{
        cy.getResultByOrder(0).containsAll(maxResolvedDedupeInfo);
        cy.getResultByOrder(0).checkResolved('maximum');
    });
});
