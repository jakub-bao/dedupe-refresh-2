describe('Filters > Super-User Filter Options', ()=> {
    it(`Should have all Org Units for super user`, () => {
        cy.loginAs('superAdmin');
        cy.goHome();
        cy.get(`#cypress_filter_organisationUnit`).click();
        cy.containsAll([
            'Rwanda',
            'Asia Region',
            'Botswana'
        ]);
        cy.get('.MuiMenuItem-root:nth-child(1)').click();
    });
});