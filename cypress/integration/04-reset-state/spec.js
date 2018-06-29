/// <reference types="cypress" />
import {addItem} from '../helper'

beforeEach(() => {
  // application should be running at port 3000
  // and the "localhost:3000" is set as "baseUrl" in "cypress.json"
  cy.request('POST', '/reset', {todos:[]})
  cy.visit('/')
})
it('loads', () => {
  cy.contains('a', 'TodoMVC')
})

it.only('adds two items', () => {
  addItem('first item')
  addItem('second item')
  cy.get('li.todo').should('have.length', 2)
})
