import CartManagerDB from "../dao/managers/cartManagerMongoDB.js";
import CartModel from "../dao/models/carts.model.js";
import CartRepository from "../repositories/CartRepository.js";

class CartService extends CartRepository{
    constructor(dao) {
        super(dao, CartModel)
    }
}

export const cartService = new CartService(new CartManagerDB())