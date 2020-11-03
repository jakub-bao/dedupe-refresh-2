Cypress.Commands.add('filters', ()=>{
    return cy.get('#cypress_filters');
});

Cypress.Commands.add('results', ()=>{
    return cy.get('#cypress_results');
});

Cypress.Commands.add('header', ()=>{
    return cy.get('#cypress_header');
});