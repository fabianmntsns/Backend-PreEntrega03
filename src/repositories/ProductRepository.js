class ProductRepository {
    constructor(dao, model) {
        this.dao = dao 
        this.model = model
    }
    
    getAll = async(data) => {
        return await this.dao.getProducts(data, this.model)
        
    }

    getById = async(id) => {
        return  await this.dao.getProductById(id, this.model)
    }

    create = async(data) => {
        return await this.dao.addProduct(data, this.model)
    }

    update = async (id, data) => {
        return await this.dao.updateProduct(id, data, this.model)
    }

    delete = async (id) => {
        return await this.dao.deleteProduct(id, this.model)
    }

    updateStock = async (id, quantity) => {
        return await this.dao.updateStock(id, quantity, this.model)
    }
}

export default ProductRepository