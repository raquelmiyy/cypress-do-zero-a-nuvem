const { it } = require("mocha")
const { describe } = require("mocha")

beforeEach(() => {
cy.visit('../src/index.html')
//para escrever testes nosso primeiro passo é visitar a página url
//testar a página localmente
    //TESTANDO LOCAL É BOM PARA QUANDO TESTAR NA INTEGRAÇÃO CONTINUA ELE PEGA QUANDO VOCE QUEBRA A APLICAÇÃO
})

describe('Central de Atendimento ao Cliente TAT', () => {
  //DEFINE A SUITE DE TESTE
  it('verifica o título da aplicação', () => {
  //DEFINE O CASO DE TESTE

    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    //testar a página localmente
    //TESTANDO LOCAL É BOM PARA QUANDO TESTAR NA INTEGRAÇÃO CONTINUA ELE PEGA QUANDO VOCE QUEBRA A APLICAÇÃO
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Raquel')
    cy.get('#lastName').type('Guimarães')
    cy.get('#email').type('raquel@teste.com')
    cy.get('#phone').type('11985160228')
    cy.get('#open-text-area').type('to feliz')
    cy.get('.button').click()
    cy.get('.success').should('be.visible')
  })

})
