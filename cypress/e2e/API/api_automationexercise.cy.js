describe('Funcionalidade: Testes de API - Automation Exercise', () => {

    const baseUrl = 'https://automationexercise.com/api';

    // Cenário: Listar produtos
    it("Dado que quero listar produtos, quando der GET /productsList, então retornar status 200", () => {
        cy.request("GET", `${baseUrl}/productsList`).then((response) => {
            expect(response.status).to.eq(200);
            // const body = JSON.parse(response.body);
            const body = response.body;

            expect(response.status).to.eq(200);
            expect(body).to.have.property('products');
        });
    });

    // Cenário: Retornar erro 405 e mensagem de erro 
    it('POST /productsList - Deve retornar status 405 e mensagem de erro para POST', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/productsList`,
        }).then((response) => {
            expect(response.status).to.equal(405);
            // const body = JSON.parse(response.body);
            expect(body).to.have.property('message');
            expect(body.message).to.include('This request method is not supported')
        });
    });

    // Cenário: Listar marcas
    it('Dado que faço um GET em /brandsList, então deve retornar lista de marcas e status 200', () => {
        cy.request('GET', `${baseUrl}/brandsList`).then((response) => {
            expect(response.status).to.equal(200);
            const body = response.body;

            // const body = JSON.parse(response.body);
            expect(body).to.have.property('brands');
            expect(body.brands).to.be.an('array');
        });
    });

    // Cenário: Buscar produto válido
    it('Dado que envio um produto válido no POST /searchProduct, então deve retornar status 200', () => {
        const searchTerm = 'top';

        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/searchProduct',
            form: true,
            body: {
                search_product: searchTerm
            }
        }).then((response) => {
            const body = response.body;
            expect(body).to.have.property('products')
            expect(response.status).to.eq(200);
            expect(response.body.products).to.be.an('array');
        });
    });

    // Cenário: Buscar sem parâmetro
    it('Dado que envio POST /searchProduct sem parâmetro, então deve retornar erro com responseCode 400', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/searchProduct`,
            form: true,
            body: {}
        }).then((response) => {
            expect(response.status).to.equal(200);
            const body = JSxxON.parse(response.body);
            expect(body).to.have.property('responseCode', 400);
        });
    });

    // Cenário: Login com dados válidos (sucesso)
    it('Dado que envio dados válidos no POST /verifyLogin, então deve retornar status 200 e mensagem de sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/verifyLogin',
            form: true,
            body: {
                email: 'ms.usuarioo@gmail.com',
                password: 'senha123'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);

            const body = JSON.parse(response.body);

            expect(body.responseCode).to.eq(200);
            expect(body.message).to.include('User exists!');
        });
    });

    // Cenário: Login com dados válidos (erro)
    it('Dado que envio dados válidos no POST /verifyLogin, então deve retornar status 200 e mensagem de sucesso', () => {
        const user = {
            email: 'ms.usuario@gmail.com',
            password: 'senha123'
        }
        cy.request({ method: "POST", url: `${baseUrl}/verifyLogin`, form: true, body: user }).then((response) => {
            expect(response.status).to.eq(200);

            const body = JSON.parse(response.body);

            expect(body.responseCode).to.eq(200);
            expect(body.message).to.include("User exists!");
        })
    });

    // Cenário: Criar novo usuário
    it('Dado que envio dados válidos no POST /createAccount, então o usuário deve ser criado com sucesso', () => {
        const email = `ms.usuario${Date.now()}@gmail.com`;

        cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/createAccount',
            form: true,
            body: {
                name: 'TesteCypress',
                email: email,
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

    // Cenário: Deletar usuário
    it('Dado que envio dados válidos no DELETE /deleteAccount, então o usuário deve ser deletado com sucesso', () => {
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
