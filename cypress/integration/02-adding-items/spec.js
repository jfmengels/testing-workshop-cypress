/// <reference types="cypress" />

const addItem = text => {
  cy.get('.new-todo').type(`${text}{enter}`)
  cy.contains('li.todo', text).should('be.visible')
}

beforeEach(function() {
  cy.visit('/')
})

it('loads', () => {
  cy.contains('a', 'TodoMVC')
})

it('starts with zero items', () => {
  cy.get('li.todo').should('not.exist')
})

it('adds two items', () => {
  addItem('first item')
  addItem('second item')
})

it('can add many items', () => {
  const N = 5
  for (let k = 0; k < N; k += 1) {
    addItem(`Item ${k}`)
  }
  cy.get('li.todo').should('have.length', 7)
})

it('can mark items as completed', () => {
  addItem('foo')
  cy.contains('li.todo', 'foo')
    .should('exist')
    .find('input[type="checkbox"]')
    .should('not.be.checked')
    .check()
    .should('be.checked')
})

it('can remove items', () => {
  addItem('bar')
  cy.contains('li.todo', 'bar').find('.destroy').click({force: true})
  cy.contains('li.todo', 'bar').should('not.exist')
})

// what a challenge?
// test more UI at http://todomvc.com/examples/vue/
