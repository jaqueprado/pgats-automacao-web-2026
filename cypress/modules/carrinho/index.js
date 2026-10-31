class Carrinho {
  adicionarPrimeiroProdutoAoCarrinho() {
    cy.get('a[href*="products"]').first().click()
    cy.contains('All Products').should('be.visible')
    cy.get('.features_items .product-image-wrapper').should('be.visible')

    ;[1, 2].forEach((productId) => {
        cy.get(`a.add-to-cart[data-product-id="${productId}"]`)
            .first()
            .click({ force: true })
        cy.contains('Added!').should('be.visible')
        cy.contains('Continue Shopping').click()
    })
  }

  navegarParaCarrinho() {
    cy.get('a[href="/view_cart"]').first().click()
  }

  preencherDadosDePagamento() {
    cy.get('[data-qa="name-on-card"]').type('PGATS Aut')
    cy.get('[data-qa="card-number"]').type('4111111111111111')
    cy.get('[data-qa="cvc"]').type('123')
    cy.get('[data-qa="expiry-month"]').type('12')
    cy.get('[data-qa="expiry-year"]').type('2027')
    cy.get('[data-qa="pay-button"]').click()
    cy.url().should('include', '/payment_done/')

  }
}

export default new Carrinho()
