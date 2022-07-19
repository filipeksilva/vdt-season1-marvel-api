

describe('GET /characters', function () {

    const characters = [
        {
            name: 'Scott Summers',
            alias: 'Ciclope',
            team: ['X-men'],
            active: true
        },
        {
            name: 'Logan',
            alias: 'Wolverine',
            team: ['X-men'],
            active: true
        },
        {
            name: 'Chris Evans',
            alias: 'Capitão América',
            team: ['Vingadores'],
            active: true
        }
    ]

    before(function () {
        cy.populateCharacters(characters)
    })

    it('deve retornar uma lista de personagens', function () {
        cy.getCharacters().then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body).to.be.a('array')
            expect(response.body.length).greaterThan(0)
        })
    })

    it('deve buscar personagem por nome', function() {
        cy.searchCharacters('Logan').then(function(response){
            expect(response.status).to.eql(200)
            expect(response.body.length).to.eql(1)
            expect(response.body[0].alias).to.eql('Wolverine')
            expect(response.body[0].team).to.eql(['X-men'])
            expect(response.body[0].active).to.eql(true)
        })
    })
})

describe('GET /characters/id', function(){
    
    const kasperCole = {
        name: 'Kasper Cole',
        alias: 'Pantera Negra',
        team: ['Wakanda'],
        active: true
    }

    context('quando tenho um personagem cadastrado', function(){

        before(function(){
            cy.postCharacter(kasperCole).then(function(response){
                Cypress.env('characterId', response.body.character_id)
            })
        })

        it('deve buscar o personagem pelo id', function(){
            const id = Cypress.env('characterId')
            cy.getCharacterById(id).then(function(response){
                expect(response.status).to.eql(200)                
                expect(response.body.alias).to.eql('Pantera Negra')
                expect(response.body.team).to.eql(['Wakanda'])
                expect(response.body.active).to.eql(true)
            })
        })

    })

    it('deve retornar 404 ao buscar por id não cadastrado', function(){
        const id = '62d047fbfcb24e20660f41e3'
            cy.getCharacterById(id).then(function(response){
                expect(response.status).to.eql(404)
            })
    })

})