/**
 * Adds a todo item
 * @param {string} text
 */
export const addItem = text => {
  cy.get('.new-todo').type(`${text}{enter}`)
  cy.contains('li.todo', text).should('be.visible')
}
