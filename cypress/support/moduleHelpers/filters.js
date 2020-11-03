Cypress.Commands.add('setFilter', (filterType, filterValue)=>{
    cy.get(`#cypress_filter_${filterType}`).select(filterValue);
});

Cypress.Commands.add('searchDedupes', ()=>{
    cy.loadingDone();
    cy.get(`#cypress_searchDedupes`).click();
});