import supertest from "supertest";
import chai from "chai";

const expect = chai.expect
const requester = supertest('http://localhost:8080')


describe("Test para ruta /api/products", () => {
    let mockProductId = null
    let mockProductId2 = null
    before(async () => {
        const mockProduct = {
            "title": "Producto prueba",
            "price": 5000,
            "status": true,
            "stock": 10,
            "description": "Producto de prueba para test",
            "code": "9999",
            "category": "Prueba"
        }

        const result = await requester.post('/api/products').send(mockProduct)
        mockProductId = result._body.payload._id
    })

    after( async() => {
        await requester.delete('/api/products/' + mockProductId2) 
    })

    it("Método GET devuelve un array", async () => {
        const result = await requester.get('/api/products')
        expect(result._body.docs).to.be.an('array')
    })

    it("Método POST agrega un producto", async () => {
        const mockProduct2 = {
            "title": "Camiseta Real Potosí 5",
            "price": 5500,
            "status": true,
            "stock": 10,
            "description": "Camiseta Oficial Local Real Potosí 5",
            "code": "045",
            "category": "Camisetas"
        }

        const result = await requester.post('/api/products').send(mockProduct2)
        
        expect(result._body.payload).to.have.property("_id")

        mockProductId2 = result._body.payload._id

    })

    it("Método DELETE elimina un producto por su ID", async () => {

        const result = await requester.delete('/api/products/' + mockProductId)
        expect(result._body.payload.docs).to.be.an('array')

    })

})
