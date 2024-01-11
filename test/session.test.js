import supertest from "supertest";
import chai from "chai";

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe("Test para ruta /api/sessions", () => {
    it("Método POST crea un usuario", async () => {
        const userMock = {
            first_name: "Nombre Mock",
            last_name: "Apellido Mock",
            email: "Mock@usuario.com",
            age: 29,
            password: "secret"
        }

        const result = await requester.post('/api/sessions/register').send(userMock)
        console.log(result)
        expect(result._body.payload).to.have.property("_id")
    })
})

