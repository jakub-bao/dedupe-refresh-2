const filterOptions = {
    organisationUnit: {contains: ['Rwanda'], notContains: ['Asia Region', 'Botswana']},
    dataType: {contains:['MER Targets', 'MER Results']},
    period: {contains:['Oct 2019 - Sep 2020', 'Oct 2020 - Sep 2021'], notContains: ['Oct 2018 - Sep 2019']},
    agency: {contains:['HHS/CDC','State/SGAC','USAID']},
    technicalArea: {contains:['AGYW','KP_MAT','LAB_PT_HIV']},
    dedupeType: {contains:['Pure Dedupes', 'Crosswalk Dedupes']}
};

const selectedOptions = [
    'Rwanda',
    'MER Targets',
    'Oct 2020 - Sep 2021',
    'Dedupe adjustments Agency',
    'AGYW',
    'Pure Dedupes'
];

function generateFilterOptionsTest(filterType, options){
    it(`Should have options for ${filterType} filter`, ()=>{
        cy.get(`#cypress_filter_${filterType}`).click();
        cy.containsAll(options.contains);
        if (options.notContains) cy.containsNotAll(options.notContains);
        cy.get('.MuiMenuItem-root:nth-child(1)').click();
    });
}

describe('Filters > Filter Options', ()=>{
    before(()=>{
        cy.loginAs('de-interAgency-rwanda');
        cy.goHome();
    });

    Object.keys(filterOptions).map(filterType=>generateFilterOptionsTest(filterType, filterOptions[filterType]));

    it('Should have filter breadcrumbs', ()=>{
        cy.header().containsNotAll(selectedOptions);
        cy.searchDedupes();
        cy.header().containsAll(selectedOptions);
    });
});