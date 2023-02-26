describe('Try to create a field without bombs and get an error modal',()=>{
    it('Create a field without bombs', ()=>{
      cy.visit('/');
      cy.fillBombAndDimension(0, '5x5');
      cy.get('.gameBtn').contains('Set Field').click();
      cy.get('.strongModal').find('.smallBlock').should('contain.text', 'You should fill the dimension and the number of bombs.');
    })
})

describe('Create a field with NxN dimensions and check if timer is working', () => {
  beforeEach(()=>{
    cy.visit('/');
  })

  it('Create a new filed with dimensions 5x5', () => {
    cy.testFieldAndTimer('5x5', 5);
  })

  it('Create a new filed with dimensions 8x8', () => {
    cy.testFieldAndTimer('8x8', 5);
  })

  it('Create a new filed with dimensions 10x10', () => {
    cy.testFieldAndTimer('10x10', 5);
  })

})

describe('Restart the game and the clock restarts', ()=>{
  beforeEach(()=>{
    cy.visit('/');
  });

  it('Create a field and then restart the game with 0 seconds', ()=>{
    cy.testFieldAndTimer('5x5', 5);
    cy.get('.gameBtn').contains('Restart').click();
    cy.testFieldAndTimer('10x10', 5);
  })
})



