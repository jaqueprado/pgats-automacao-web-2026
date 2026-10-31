/// <reference types="cypress" />

import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'
import carrinho from '../modules/carrinho'

describe('Automation Exercise', () => {
    const password = '12345'

    const openHomePage = () => {
        cy.visit('https://www.automationexercise.com')
        cy.get('body').should('be.visible')
    }

    const openLoginPage = () => {
        cy.visit('https://www.automationexercise.com')
        menu.navegarParaLogin()
    }

    const registerUser = (email) => {
        openLoginPage()
        login.preencherFormularioDePreCadastro('PGATS Aut', email)
        cadastro.preencherFormularioDeCadastroCompleto()
        cy.contains('Account Created!').should('be.visible')
        cy.xpath('//*[@data-qa="continue-button"]').click()
        cy.wait(5000)
        cy.contains('Logged in as PGATS Aut').should('be.visible')
    }

    it('Caso de Teste 01: Registrar Usuário', () => {
        const email = `jaque.silva${Date.now()}@mail.com`

        registerUser(email)
        cy.contains('Delete Account').click()
        cy.contains('Account Deleted!').should('be.visible')
        cy.xpath('//*[@data-qa="continue-button"]').click()
    })

    it('Caso de Teste 02: Login com email e senha corretos', () => {
        const email = `jaque.silva${Date.now()}@mail.com`

        registerUser(email)
        menu.efetuarLogout()
        openLoginPage()
        login.preencherFormularioDeLogin(email, password)
        cy.wait(5000)
        cy.contains('Logged in as PGATS Aut').should('be.visible')

        cy.contains('Delete Account').click()
        cy.contains('Account Deleted!').should('be.visible')
        cy.xpath('//*[@data-qa="continue-button"]').click()
    })

    it('Caso de Teste 03: Login com e-mail e senha incorretos', () => {
        openLoginPage()
        login.preencherFormularioDeLogin(`invalid-${Date.now()}@mail.com`, 'senha-incorreta')

        cy.contains('Your email or password is incorrect!').should('be.visible')
    })

    it('Caso de Teste 04: Deslogar Usuário', () => {
        const email = `jaque.silva-${Date.now()}@mail.com`

        registerUser(email)
        menu.efetuarLogout()

        cy.url().should('include', '/login')
        cy.contains('Login to your account').should('be.visible')

        openLoginPage()
        login.preencherFormularioDeLogin(email, password)
        cy.wait(5000)
        cy.contains('Delete Account').click()
        cy.contains('Account Deleted!').should('be.visible')
        cy.xpath('//*[@data-qa="continue-button"]').click()
    })

    it('Caso de Teste 05: Cadastrar um usuário com um endereço de email que já existe', () => {
        const email = `jaque.silva${Date.now()}@mail.com`

        registerUser(email)
        menu.efetuarLogout()
        openLoginPage()
        login.preencherFormularioDePreCadastro('PGATS Aut', email)

        cy.contains('Email Address already exist!').should('be.visible')

        openLoginPage()
        login.preencherFormularioDeLogin(email, password)
        cy.wait(5000)
        cy.contains('Delete Account').click()
        cy.contains('Account Deleted!').should('be.visible')
        cy.xpath('//*[@data-qa="continue-button"]').click()
    })

    it('Caso de Teste 08: Verificar detalhes do produto', () => {
        openHomePage()

        cy.get('a[href="/products"]').click()
        cy.wait(5000)
        cy.contains('All Products').should('be.visible')
        cy.get('.features_items').should('be.visible')

        cy.get('.features_items .product-image-wrapper').first().within(() => {
            cy.contains('View Product').click()
        })

        cy.url().should('include', '/product_details/')
        cy.get('.product-information').within(() => {
            cy.get('h2').should('be.visible')
            cy.contains('Category:').should('be.visible')
            cy.contains('Rs.').should('be.visible')
            cy.contains('Availability:').should('be.visible')
            cy.contains('Condition:').should('be.visible')
            cy.contains('Brand:').should('be.visible')
        })
    })

    it('Caso de Teste 09: Pesquisar produto', () => {
        openHomePage()

        cy.get('a[href="/products"]').click()
        cy.wait(3000)
        cy.contains('All Products').should('be.visible')

        cy.get('#search_product').type('dress')
        cy.get('#submit_search').click()

        cy.contains('Searched Products').should('be.visible')
        cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0)
    })

    it('Caso de Teste 10: Verificar subscrição na página home', () => {
        openHomePage()

        cy.scrollTo('bottom')
        cy.contains('Subscription').should('be.visible')

        cy.get('#susbscribe_email').type(`subscriber${Math.floor(Math.random() * 1000000)}@mail.com`)
        cy.get('#subscribe').click()

        cy.contains('You have been successfully subscribed!').should('be.visible')
    })

    it('Caso de Teste 15: Realizar pedido: Registrar durante checkout', () => {
        const email = `jaque.silva${Math.floor(Math.random() * 1000000)}@mail.com`

        openLoginPage()
        login.preencherFormularioDePreCadastro('PGATS Aut', email)
        cadastro.preencherFormularioDeCadastroCompleto()
        cy.contains('Account Created!').should('be.visible')
        cy.xpath('//*[@data-qa="continue-button"]').click()
        cy.wait(5000)
        cy.contains('Logged in as PGATS Aut').should('be.visible')

        cy.get('a[href="/products"]').click()
        carrinho.adicionarPrimeiroProdutoAoCarrinho()
        cy.wait (3000)
        carrinho.navegarParaCarrinho()

        cy.url().should('include', '/view_cart')
        cy.get('.cart_info').should('be.visible')

        cy.contains('Proceed To Checkout').click()

        cy.get('#address_delivery').should('be.visible')
        cy.get('#cart_info').should('be.visible')

        cy.get('textarea[name="message"]').type('Por favor, entregar no período da manhã.')
        cy.contains('Place Order').click()

        carrinho.preencherDadosDePagamento()

        cy.contains('Delete Account').click()
        cy.contains('Account Deleted!').should('be.visible')
        cy.xpath('//*[@data-qa="continue-button"]').click()
    })

    it('Caso de Teste 16: Realizar pedido: Login antes do checkout', () => {
        const email = `jaque.silva${Date.now()}@mail.com`

        registerUser(email)
        menu.efetuarLogout()

        openLoginPage()
        login.preencherFormularioDeLogin(email, password)
        cy.wait(5000)
        cy.contains('Logged in as PGATS Aut').should('be.visible')

        cy.get('a[href="/products"]').click()
        carrinho.adicionarPrimeiroProdutoAoCarrinho()
        cy.wait (3000)
        carrinho.navegarParaCarrinho()

        cy.url().should('include', '/view_cart')
        cy.get('.cart_info').should('be.visible')

        cy.contains('Proceed To Checkout').click()

        cy.get('#address_delivery').should('be.visible')
        cy.get('#cart_info').should('be.visible')

        cy.get('textarea[name="message"]').type('Por favor, entregar no período da manhã.')
        cy.contains('Place Order').click()
        cy.wait(5000)
        carrinho.preencherDadosDePagamento()

        cy.contains('Delete Account').click()
        cy.contains('Account Deleted!').should('be.visible')
        cy.xpath('//*[@data-qa="continue-button"]').click()
    })
})
