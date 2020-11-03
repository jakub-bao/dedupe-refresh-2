const selectedTerms = ['Rwanda', 'MER Results', 'Apr - Jun 2020'];

describe('Filter Collapse', ()=> {
    before(() => {
        cy.loginAs('de-interAgency-rwanda');
        cy.goHome();
    });

    it('Should be able to hide filters', () => {
        cy.setFilter('organisationUnit', 'XtxUYCsDWrR');
        cy.setFilter('dataType', 'RESULTS');
        cy.setFilter('period', '2020Q2');
        cy.filters().containsAll(selectedTerms);
        cy.get('#cypress_collapseFilters').click();
        cy.filters().containsNotAll(selectedTerms);
    });

    it('Should be able to open filters', ()=>{
        cy.get('#cypress_openFilters').click();
        cy.filters().containsAll(selectedTerms);
    });
});