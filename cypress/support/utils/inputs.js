Cypress.Commands.overwrite('select', (x, subject, value)=>{
    cy.get(subject).click();
    cy.get(`[data-value="${value}"]`).click();
});

Cypress.Commands.add('checked', {prevSubject: 'element'}, (subject, value)=>{
    console.log(subject);
    if (value) cy.get(subject).find('input').should('be.checked');
    else cy.get(subject).find('input').should('be.not.checked');
});