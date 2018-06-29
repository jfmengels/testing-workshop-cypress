/// <reference types="cypress" />
import {addItem} from '../helper'

beforeEach(() => {
  // application should be running at port 3000
  // and the "localhost:3000" is set as "baseUrl" in "cypress.json"
  cy.visit('/')
})
it('loads', () => {
  cy.contains('a', 'TodoMVC')
})
/**
 * Adds a todo item
 * @param {string} text
 */
it('adds two items', () => {
  addItem('first item')
  addItem('second item')
  cy.get('[data-cy="item"]').should('have.length', 2)
})
