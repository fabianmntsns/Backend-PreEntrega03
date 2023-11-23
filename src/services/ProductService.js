import ProductManagerDB from "../dao/managers/productManagerMongoDB.js";
import productsModel from "../dao/models/products.model.js";
import ProductRepository from "../repositories/ProductRepository.js";

class ProductService extends ProductRepository {
    constructor(dao) {
        super(dao, productsModel)
    }
}

export const productService = new ProductService(new ProductManagerDB())