beforeEach(() => {
cy.visit('../src/index.html')
//para escrever testes nosso primeiro passo é visitar a página url
//testar a página localmente
    //TESTANDO LOCAL É BOM PARA QUANDO TESTAR NA INTEGRAÇÃO CONTINUA ELE PEGA QUANDO VOCE QUEBRA A APLICAÇÃO
})

describe('Central de Atendimento ao Cliente TAT', () => {
  //DEFINE A SUITE DE TESTE
  it('CT0001: verifica o título da aplicação', () => {
  //DEFINE O CASO DE TESTE

    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    //testar a página localmente
    //TESTANDO LOCAL É BOM PARA QUANDO TESTAR NA INTEGRAÇÃO CONTINUA ELE PEGA QUANDO VOCE QUEBRA A APLICAÇÃO
  })

  it('CT0002: preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Raquel')
    cy.get('#lastName').type('Guimarães')
    cy.get('#email').type('raquel@teste.com')
    cy.get('#phone').type('11985160228')
    cy.get('#open-text-area').type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', {delay : 0})
    cy.contains('button','Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('CT0003: exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Raquel')
    cy.get('#lastName').type('Guimarães')
    cy.get('#email').type('raquel@teste')
    cy.get('#phone').type('11985160228')
    cy.get('#open-text-area').type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', {delay : 0})
    cy.contains('button','Enviar').click()
    
    cy.get('.error').should('be.visible')
  })

  it('CT0004: campo telefone continua vazio após ser preenchido com valor não-numérico', () => {
     cy.get('#phone').type('telefone').should('have.value', '')
  })

  it('CT0005: exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Raquel')
    cy.get('#lastName').type('Guimarães')
    cy.get('#email').type('raquel@teste.com')
    //cy.get('#phone-checkbox').type('true')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. ', {delay : 0})
    
    cy.contains('button','Enviar').click()
    
    cy.get('.error').should('be.visible')
  })

  it('CT0006: preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Raquel').should('have.value', 'Raquel').clear().should('have.value', '')
    cy.get('#lastName').type('Guimarães').should('have.value', 'Guimarães').clear().should('have.value', '')
    cy.get('#email').type('raquel@teste.com').should('have.value', 'raquel@teste.com').clear().should('have.value', '')
    cy.get('#phone').type('11985160228').should('have.value', '11985160228').clear().should('have.value', '')
  })

  it('CT0007: exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=> {
    //cy.get('form').contains('button','Enviar').click()
    
    cy.contains('button','Enviar').click()

    cy.get('.error').should('be.visible')
  })


  //podemos fazer uso de comandos customizados para evitar duplicação de código
  //
  it('CT0008: envia o formulário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('CT0009: seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')

  })

  
  it('CT0010: seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('CT0011: seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('CT0012: marca o tipo de atendimento "Feedback"', () => {
    //cy.get('input[type="radio"]').check('feedback').should('have.value', 'feedback', 'be.checked')
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  })

  it('CT0013: marca cada tipo de atendimento', () => {
     //cy.get('input[type="radio"]').check('feedback').should('have.value', 'feedback', 'be.checked')
    // cy.get('input[type="radio"]').check('ajuda').should('have.value', 'ajuda', 'be.checked')
    // cy.get('input[type="radio"]').check('elogio').should('have.value', 'elogio', 'be.checked')
    cy.get('input[type="radio"]')
      .each((typeOfService) => {   //ela recebe uma function - aqui ela recebe essa função de callback typeOfService
      cy.wrap(typeOfService)
      .check().should('be.checked')
    })
  })

  it('CT0014: marca ambos checkboxes, depois desmarca o último', ()=> {
    cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
  })

  it('CT0015: seleciona um arquivo da pasta fixtures', () => {
    //cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json').should('be.visible')
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .should(input => {
      //console.log(input)
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('CT0017: seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})  //add um objeto com uma propriedade action
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('CT0018: seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sample file') 
    cy.get('#file-upload')
    .selectFile('@sample file', {action: 'drag-drop'})  //add um objeto com uma propriedade action
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('CT0019: verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    //cy.get('#privacy')
    //cy.get('a') genérico
    //origin visita mutiplas abas
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'target', '_blank')
    .and('have.attr','href','privacy.html')
  })

  it('CT0020: acessa a página da política de privacidade removendo o target e então clicando no link', ()=> {
    cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()
    
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
  })


})