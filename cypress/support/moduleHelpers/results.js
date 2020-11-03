Cypress.Commands.add('loadingDone', ()=>{
    cy.get('.cypress_loading').should('not.exist', {timeout: 15000});
});

Cypress.Commands.add('getResultByOrder', (index)=>{
    return cy.results().find('.cypress_resultsRow').eq(index);
});