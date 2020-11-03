const allMethods = ['sum', 'maximum', 'custom'];

Cypress.Commands.add('checkResolved', {prevSubject: true},(subject, method)=>{
    if (method === 'none') {
        allMethods.forEach(method => {
            cy.get(subject).find('.cypress_resolutionMethodCell').find(`.cypress__${method}`).checked(false);
        })
    } else {
        cy.get(subject).find('.cypress_resolutionMethodCell').find(`.cypress__${method}`).checked(true);
    }
});