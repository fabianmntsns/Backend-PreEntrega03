import mongoose from "mongoose";

class ProductManagerDB {

    async addProduct(product, productsModel) {
        try {
            return await productsModel.create(product)
        } catch (e) {
            return "[400] " + e.message
        }
    }

    async getProducts(data, productsModel) {


        try {
            const { limit, page, sort, availability, category } = data || {};
            const options = {
                page: !page ? 1 : page,
                limit: !limit ? 3 : limit,
                lean: true
            };
            if (sort) {
                options["sort"] = {
                    price: (sort === "asc") ? 1 : -1
                }
            }

            const filters = {}

            if (availability) {
                filters["stock"] = {
                    $gt: 0
                }
            }
            if (category) {
                filters["category"] = category

            }
            return await productsModel.paginate(filters, options)

        } catch (e) {
            return "[400] " + e.message
        }
    }

    async getProductById(id, productsModel) {
        try {
            const objectId = new mongoose.Types.ObjectId(id)
            const product = await productsModel.find({ _id: objectId }).lean()
            if (!product.length) {
                return '[404] No encontrado'
            }

            return product[0]
        } catch (e) {
            return "[400] " + e.message
        }
    }

    async updateProduct(id, updateProduct, productsModel) {
        try {
            const objectId = new mongoose.Types.ObjectId(id)
            const product = await productsModel.findOneAndUpdate({ _id: objectId }, updateProduct)
            if (!product) return '[404] No encontrado'
            return this.getProductById(id)
        } catch (e) {
            return "[400] " + e.message
        }
    }

    async deleteProduct(id, productsModel) {
        try {
            const objectId = new mongoose.Types.ObjectId(id)
            const result = await productsModel.deleteOne({ _id: objectId })
            if (!result.deletedCount) return '[404] No se encontró el ID del producto a eliminar.'
            return this.getProducts({}, productsModel)
        } catch (e) {
            return "[400] " + e.message
        }
    }

    async updateStock(pid, quantity, productsModel) {
        try {
            const product = await this.getProductById(pid, productsModel)
            //si stock = 3 y quantity = 4 ==> el cliente se lleva 3, el stock queda en 0, queda en carrito 1
            //si stock = 3

            let purchasesCompleted = 0
            if (product.stock >= quantity) {
                purchasesCompleted = quantity
            } else {
                purchasesCompleted = product.stock
            }

            await this.updateProduct(pid, { stock: product.stock - purchasesCompleted }, productsModel)

            return purchasesCompleted

        } catch (e) {
            return "[400] " + e.message
        }
    }
}

export default ProductManagerDB