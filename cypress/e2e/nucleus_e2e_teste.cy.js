/// <reference types = "Cypress"/>

var faker = require('faker-br');
var nome = faker.name.firstName()
var sobrenome = faker.name.lastName()
var email = faker.internet.email()
var senha = faker.internet.password() + '1@'
var cpf = faker.br.cpf()
var numeroCelular = faker.phone.phoneNumberFormat()
var cep = faker.address.zipCodeValidByState('SP')
var numeroCasa = faker.random.number()

describe('Nucleus.eti - Teste Automatizado - Natura', () => {
  it('Deve fazer um pedido na loja Natura de ponta a ponta', () => {

    cy.viewport(1920, 1080)
    cy.visit('/')

    // Validar cadastro de cliente no site Natura
    cy.contains('Entre ou cadastre-se').click()
    cy.contains('Criar conta').click()
    cy.get('input[name="firstName"]').type(nome)
    cy.get('input[name="lastName"]').type(sobrenome)
    cy.get('input[name="email"]').type(email)
    cy.get('#password-field').type(senha)
    cy.get('#confirmPassword-field').type(senha)
    cy.get('input[name="cpf"]').type(cpf) 
    cy.get('input[name="dateOfBirth"]').type('08/04/1997')
    cy.get('input[value="noSpecify"]').check()
    cy.get('input[name="homePhone"]').type(numeroCelular)
    cy.get('#acceptedterms').check()
    cy.contains('Criar Conta').click()

    // Validar alteração de informações do usuário
    nome = faker.name.firstName()
    sobrenome = faker.name.lastName()
    cy.contains('Meus acessos').click()
    cy.contains('Dados Pessoais').click()
    cy.contains('Nome').click()
    cy.get('input[name="firstName"]').clear().type(nome)
    cy.get('input[name="lastName"]').clear().type(sobrenome) 
    cy.get('.MuiButton-contained').click()

    // Validar o fluxo de compra de produto da Natura
    cy.visit('/')
    cy.get(':nth-child(2) > [data-testid="category-link"] > p').click()
    cy.contains('Ilía Deo Parfum').click()
    cy.get('#btnBuy').click()
    cy.wait(5000)
    cy.get('div[aria-label="Survey"]').then((elem) => { elem.remove() })
    cy.get('[data-testid="basket-badge"]').should('be.visible').click()
    cy.get('[data-testid="open-cart"]').click()
    cy.get('[data-testid="open-delivery"]').click()
    cy.get('input[name="postalCode"]').type(cep)
    cy.get('input[name="houseNumber"]').type(numeroCasa)
    cy.contains('Salvar Alterações').click()
    cy.get('[data-testid="open-payment"]').click()
    cy.contains('Boleto').click()
    cy.get('[data-testid="purchase"]').click()
    cy.contains('Pedido finalizado', { timeout: 60000 }).should('be.visible').should('contain', 'Pedido finalizado com sucesso')
  })
})