// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('testFieldAndTimer', (size, bombs) => {
    let dim = size.split('x')[0];
    cy.clock();
    cy.get('[id=dimension]').should('contain.value', '5x5').select(size).should('contain.value', size);
    cy.get('[id=bombs]').should('contain.value', 0).clear().type(bombs).should('contain.value', bombs);
    cy.get('.gameBtn').contains('Set Field').click();
    cy.get('[id=field').find('tr').should('have.length', dim);
    cy.get('[id=field').find('td').should('have.length', dim*dim);
    cy.get('[id=clock]').should('contain.text', 0);
    cy.tick(2000);
    cy.get('[id=clock]').should('contain.text', 2);
})

Cypress.Commands.add('fillBombAndDimension', (bombs, size)=>{
    cy.get('[id=dimension]').should('contain.value', '5x5').select(size).should('contain.value', size);
    cy.get('[id=bombs]').should('contain.value', 0).clear().type(bombs).should('contain.value', bombs);
})