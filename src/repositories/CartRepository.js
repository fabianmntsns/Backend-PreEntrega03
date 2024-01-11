
class CartRepository {
    constructor(dao, model) {
        this.dao = dao
        this.model = model
    }

    create = async () => {
        return await this.dao.addCart(this.model)
    }

    getById = async (id) => {
        return await this.dao.getCartById(id, this.model)
    }

    update = async (pid, cid) => {
        return await this.dao.addProductToCart(pid, cid, this.model)
    }

    delete = async (cid, pid) => {
        return await this.dao.deleteProductFromCart(cid, pid, this.model)
    }

    updateCart = async (cid, products) => {
        return await this.dao.updateCart(cid, products, this.model)
    }

    updateQuantity = async (cid, pid, quantity) => {
        return await this.dao.updateProductQuantity(cid, pid, quantity, this.model)
    }

    deleteAll = async (cid) => {
        return await this.dao.deleteAllProducts(cid, this.model)
    }
}

export default CartRepository