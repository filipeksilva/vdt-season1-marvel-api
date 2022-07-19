

describe('POST /characters', function(){

    // Limpa a massa de dados localmente
    // before(function () {
    //     cy.back2ThePast();
    // })

    it('deve cadastrar um personagem', function(){
        
        const character = {
            name: 'Tony Stark',
            alias: 'Homem de Ferro',
            team: ['vingadores'],
            active: true
        }

        cy.postCharacter(character)
            .then(function(response){
                expect(response.status).to.eql(201)
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eql(24)
            })
    })

    context('quando o personagem já existe', function(){

        const character = {
            name: 'Peter Parker',
	        alias: 'Homem Aranha',
	        team: ['Vingadores'],
        	active: true
        }

        before(function(){
            cy.postCharacter(character).then(function(response){
                expect(response.status).to.eql(201)            
            })
        })

        it('não deve cadastrar duplicado', function(){
            cy.postCharacter(character).then(function(response){
                expect(response.status).to.eql(400)     
                expect(response.body.error).to.eql('Duplicate character')       
            })
        })
        
    })

    context('validar campos obrigatórios', ()=>{

        const deadpool = {
            name: 'Wade Wilson',
            alias: 'Deadpool',
            team: ['vingadores'],
            //active: true
        }
        const hulk = {
            name: 'Bruce Banner',
            alias: 'Hulk',
            //team: ['vingadores'],
            active: true
        }
        const capitaMarvel = {
            name: 'Carol Danvers',
            //alias: 'Capitã Marvel',
            team: ['vingadores'],
            active: true
        }
        const viuvaNegra = {
            //name: 'Yelena Belova',
            alias: 'Viúva Negra',
            team: ['vingadores'],
            active: true
        }

        it('campo "active"', ()=>{
            cy.postCharacter(deadpool).then(function(response){
                expect(response.status).to.eql(400)
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('\"active\" is required')
            })
        })

        it('campo "team"', ()=>{
            cy.postCharacter(hulk).then(function(response){
                expect(response.status).to.eql(400)
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('\"team\" is required')
            })
        })

        it('campo "alias"', ()=>{
            cy.postCharacter(capitaMarvel).then(function(response){
                expect(response.status).to.eql(400)
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('\"alias\" is required')
            })
        })

        it('campo "name"', ()=>{
            cy.postCharacter(viuvaNegra).then(function(response){
                expect(response.status).to.eql(400)
                expect(response.body.message).to.eql('Validation failed')
                expect(response.body.validation.body.message).to.eql('\"name\" is required')
            })
        })

    })

})