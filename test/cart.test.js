import supertest from "supertest";
import chai from "chai";

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe("Test para ruta /api/carts", () => {
    let mockCartId = null
    let mockProductId = null

    before(async () => {
        let result = await requester.post('/api/carts')
        mockCartId = result._body.payload._id

            const mockProduct = {
                "title": "Producto prueba",
                "price": 5000,
                "status": true,
                "stock": 10,
                "description": "Producto de prueba para test",
                "code": "99999119",
                "category": "Prueba"
            }

        result = await requester.post('/api/products').send(mockProduct)

        mockProductId = result._body.payload._id

        await requester.post('/api/carts/' + mockCartId + '/product/' + mockProductId)

    })

    after(async () => {
        await requester.delete('/api/products/' + mockProductId)
    })

    it("Método GET busca un carrito por ID", async () => {
        const result = await requester.get('/api/carts/' + mockCartId)
        expect(result._body.payload).to.have.property("_id")
    })

    it("Método POST aumenta correctamente la cantidad de un producto", async () => {
        let result = await requester.get('/api/carts/' + mockCartId)
        const mockQuantity_i = result._body.payload.products[0].quantity 

        result = await requester.post('/api/carts/' + mockCartId + '/product/' + mockProductId) 
        const mockQuantity_f = result._body.payload.products[0].quantity 

        expect(mockQuantity_f).to.be.deep.equal(mockQuantity_i + 1) 

    })

    it("Método DELETE para eliminar todos los productos del carrito", async () => {

        const result = await requester.delete('/api/carts/' + mockCartId) 
        expect(result._body.payload.products).to.be.deep.equal([])

    })


})