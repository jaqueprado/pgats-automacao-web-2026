class Cadastro {
  preencherFormularioDeCadastroCompleto() {
    cy.get('#id_gender2').check()
    cy.get('input#password').type('12345', { log: false })
    cy.get('select[data-qa=days]').select('19')
    cy.get('select[data-qa=months]').select('June')
    cy.get('select[data-qa=years]').select('1986')
    cy.get('input[type=checkbox]#newsletter').check()
    cy.get('input[type=checkbox]#optin').check()
    cy.get('input#first_name').type('PGATS')
    cy.get('input#last_name').type('Aut')
    cy.get('input#company').type('PGATS')
    cy.get('input#address1').type('Example Address')
    cy.get('select#country').select('United States')
    cy.get('input#state').type('California')
    cy.get('input#city').type('San Francisco')
    cy.get('[data-qa="zipcode"]').type('12345')
    cy.get('[data-qa="mobile_number"]').type('999999999')
    cy.get('[data-qa="create-account"]').click()
  }
}

export default new Cadastro()
