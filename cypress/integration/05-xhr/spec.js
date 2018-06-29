/// <reference types="cypress" />
// note, we are not resetting the server before each test
// and we want to confirm that IF the application has items already
// (for example add them manually using the browser localhost:3000)
// then these tests fail!

it('starts with zero items (waits)', () => {
  cy.visit('/')
  // wait 1 second
  cy.wait(1000)
  // then check the number of items
  cy.get('li.todo').should('have.length', 0)
})

it('starts with zero items', () => {
  // start Cypress network proxy with cy.server()
  cy.server()
  // spy on route `GET /todos`
  //  with cy.route(...).as(<alias name>)
  cy.route('GET', '/todos').as('getTodos')
  // THEN visit the page
  cy.visit('/')
  // wait for `GET /todos` route
  cy.wait('@getTodos')
  //  using "@<alias name>" string
  // then check the DOM
  cy.get('li.todo').should('have.length', 0)
})

it('starts with zero items (stubbed response)', () => {
  // start Cypress network server
  // stub `GET /todos` with []
  // save the stub as an alias
  cy.server()
  cy.route('GET', '/todos', []).as('getTodos')

  // THEN visit the page
  cy.visit('/')

  // wait for the route alias
  // grab its response body
  // and make sure the body is an empty list
  cy.wait('@getTodos')
    .its('response.body')
    .should('have.length', 0)
  cy.get('li.todo').should('have.length', 0)
})

it('starts with zero items (fixture)', () => {
  // start Cypress network server
  // stub `GET /todos` with fixture "empty-list"
  cy.server()
  cy.route('GET', '/todos', 'fixture:empty-list.json').as('getTodos')

  // visit the page
  cy.visit('/')
  cy.wait('@getTodos')

  // then check the DOM
  cy.get('li.todo').should('have.length', 0)
})

it('posts new item to the server', () => {
  // start Cypress network server
  // spy on "POST /todos", save as alias
  cy.server()
  cy.route('POST', '/todos').as('new-item')
  cy.visit('/')
  cy.get('.new-todo').type('test api{enter}')

  // wait on XHR call using the alias, grab its request or response body
  // and make sure it contains
  // {title: 'test api', completed: false}
  // hint: use cy.wait(...).its(...).should('have.contain', ...)
  cy.wait('@new-item')
    .its('response.body')
    .should('have.contain', {title: 'test api', completed: false})
})

  // start Cypress network server
it('loads several items from a fixture', () => {
  // stub route `GET /todos` with data from a fixture file "two-items.json"
  cy.server()
  cy.route('GET', '/todos', 'fixture:two-items.json').as('getTodos')
  // THEN visit the page
  cy.visit('/')
  cy.wait('@getTodos')
  // then check the DOM: some items should be marked completed
  // we can do this in a variety of ways
  cy.contains('.todo', 'first item from fixture')
    .should('not.have.class', 'completed')
    .find('.toggle')
    .should('not.be.checked')
  cy.contains('.todo', 'second item from fixture')
    .should('have.class', 'completed')
    .find('.toggle')
    .should('be.checked')
})
