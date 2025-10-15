describe('Funcionalidade: Testes de API - Automation Exercise', () => {

    // retornar lista de produtos
    it('Cenário: Listagem dos produtos - Deve retornar a lista de produtos com sucesso', () => {
        cy.request('GET', 'https://automationexercise.com/api/productsList').then((response) => {
            expect(response.status).to.equal(200);
        });
    });

    // retornar status 405 e mensagem de erro VERIFICAR
    it('Cenário: POST /api/productsList - Deve retornar status 405 E mensagem de erro (método não permitido)', () => {
        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/productsList',
        }).then((response) => {

            const responseJson = JSON.parse(response.body);
            expect(response.status).to.equal(200);
            expect(responseJson).to.have.property('responseCode', 405);
            expect(responseJson.responseCode).to.equal(405);
        });
    });

    // retornar lista de marcas
    it('Cenário: GET /api/brandsList - Deve retornar lista de marcas e status 200', () => {
        cy.request('GET', 'https://automationexercise.com/api/brandsList').then((response) => {
            expect(response.status).to.equal(200);

            const responseJson = JSON.parse(response.body);
            expect(responseJson).to.have.property('brands');
            expect(responseJson.brands).to.be.an('array');
            expect(responseJson.brands.length).to.be.greaterThan(0);

            const firstBrand = responseJson.brands[0];
            expect(firstBrand).to.have.all.keys('id', 'brand');
            expect(firstBrand.brand).to.be.a('string');
        });
    });

    //Buscar produto válido 
    it('Cenário: POST /api/searchProduct - Deve buscar por produto válido e validar resposta com status (200)', () => {
        const searchTerm = 'blue top';

        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/searchProduct',
            form: true,
            body: {
                search_product: searchTerm
            }
        }).then((response) => {
            expect(response.status).to.equal(200);
        });
    });

    //Enviar sem parâmetro search_product
    it('Cenário: POST /api/searchProduct - Sem parâmetro deve retornar erro (status 400)', () => {
        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/searchProduct',
            form: true,
            body: {}
        }).then((response) => {
            expect(response.status).to.equal(200);
            const responseJson = JSON.parse(response.body);
            expect(responseJson).to.have.property('responseCode', 400);
        });
    });

    //Validar login com dados válidos (status 200) e inválidos (status 404) VERIFICAR
    it('Cenário: POST /api/verifyLogin - Validar login com dados válidos (status 200)', () => {

        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/verifyLogin',
            form: true,
            body: {
                email: email,
                password: senha
            }
        }).then((response) => {
            const responseJson = JSON.parse(response.body);
            expect(responseJson.responseCode).to.equal(200);
            expect(responseJson.message).to.include('User exists!');
        });

    });

    // Criar usuário
    it('Cenário: POST /api/createAccount - Criar novo usuário e validar mensagem de sucesso (status 200)', () => {
        const email = `ms.usuario${Date.now()}@gmail.com`;

        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/createAccount',
            form: true,
            body: {
                name: 'TesteCypress',
                email: 'ms.usuario@gmail.com',
                password: 'senha123',
                title: 'MS',
                birth_date: '22',
                birth_month: '02',
                birth_year: '2006',
                firstname: 'Maisa',
                lastname: 'Amaral',
                company: 'Automation Test',
                address1: 'Rua dos Japoneses, 61',
                address2: 'Complemento',
                country: 'Brazil',
                zipcode: '17500-000',
                state: 'São Paulo',
                city: 'Campinas',
                mobile_number: '14996772006'
            }
        }).then((response) => {
            expect(response.status).to.equal(200);
            const responseJson = JSON.parse(response.body);
            expect(responseJson).to.have.property('responseCode', 201);
        });
    });

    //Deletar
    it('Cenário: DELETE /api/deleteAccount - Deve deletar o usuário com sucesso (status 200)', () => {
        const email = 'ms.usuario@gmail.com';
        const password = 'senha123';

        cy.request({
            method: 'DELETE',
            url: 'https://automationexercise.com/api/deleteAccount',
            form: true,
            body: {
                email: email,
                password: password
            }
        }).then((response) => {
            expect(response.status).to.equal(200);
            const responseJson = JSON.parse(response.body);
            expect(responseJson).to.have.property('responseCode', 200);
        });
    });
});