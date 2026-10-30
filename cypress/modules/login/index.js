class Login {
  preencherFormularioDePreCadastro(name, email) {
    cy.get('[data-qa="signup-name"]').type(name)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.contains('button', 'Signup').click()
  }

  preencherFormularioDeLogin(user, pass) {
    cy.get(`[data-qa="login-email"]`).type(user)
    cy.get(`[data-qa="login-password"]`).type(pass)
    cy.get(`[data-qa="login-button"]`).click()
  }
}

export default new Login()
