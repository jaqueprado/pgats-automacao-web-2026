class Carrinho {
  adicionarPrimeiroProdutoAoCarrinho() {
    cy.get('.features_items .product-image-wrapper').first().trigger('mouseover')
    cy.get('.features_items .product-image-wrapper').first().find('.add-to-cart').first().click()
    cy.get('.modal-footer button').click()
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
  }
}

export default new Carrinho()
