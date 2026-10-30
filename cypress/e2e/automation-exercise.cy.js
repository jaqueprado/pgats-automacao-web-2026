/// <reference types="cypress" />

describe('Automation Exercise', () => {
  // Cadastro
  // cy.get() -> elementos baseados em css selector
  // cy.contains() -> elementos baseados em texto

  it('Cadastrar um novo usuário com sucesso', () => {
    cy.visit('https://www.automationexercise.com')
    cy.get('a[href*=login]').click()

    cy.get('[data-qa="signup-name"]').type('PGATS Aut')
    cy.get('[data-qa="signup-email"]').type('jaque.prado@mail.com')

    cy.get('[data-qa="signup-button"]').click()

    // radio buttons -> check
    cy.get('#id_gender2').check()

    cy.get('[data-qa="password"]').type('12345')

    // Selects e Comboboxes -> select
    cy.get('[data-qa="days"]').select('1')
    // adicionar mês e ano

    // checkboxes -> check
    cy.get('#newsletter').check()
  });
});

