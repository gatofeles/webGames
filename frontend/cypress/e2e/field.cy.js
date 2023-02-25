describe('tests field', () => {
  it('Create a new filed with dimensions 5x5', () => {
    cy.generateField('5x5', 5);
  })

  it('Create a new filed with dimensions 8x8', () => {
    cy.generateField('8x8', 5);
  })

  it('Create a new filed with dimensions 10x10', () => {
    cy.generateField('10x10', 5);
  })

})