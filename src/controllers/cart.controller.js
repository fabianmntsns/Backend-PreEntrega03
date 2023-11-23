import { cartService } from "../services/CartService.js"
import { productService } from "../services/ProductService.js"
import { ticketService } from "../services/TicketService.js"

export const addCartController = async (req, res) => {
    const result = await cartService.create()
    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1, 4))).json({ error: result.slice(6) })
    }
    res.status(201).json({ status: 'success', payload: result })
}


export const getCartByIdController = async (req, res) => {
    const id = req.params.cid
    const result = await cartService.getById(id)
    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1, 4))).json({ error: result.slice(6) })
    }
    res.status(200).json({ status: 'success', payload: result })
}

export const addProductToCartController = async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const result = await cartService.update(pid, cid)
    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1, 4))).json({ error: result.slice(6) })
    }
    res.status(201).json({ status: 'success', payload: result })
}

export const deleteProductFromCartController = async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid

    const result = await cartService.delete(cid, pid)

    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1, 4))).json({ error: result.slice(6) })
    }
    res.status(201).json({ status: 'success', payload: result })
}

export const updateCartController = async (req, res) => {
    const cid = req.params.cid
    const body = req.body

    const result = await cartService.updateCart(cid, body.products)
    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1, 4))).json({ error: result.slice(6) })
    }
    res.status(201).json({ status: 'success', payload: result })
}

export const updateProductQuantityController = async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const body = req.body

    const result = await cartService.updateQuantity(cid, pid, body.quantity)
    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1, 4))).json({ error: result.slice(6) })
    }
    res.status(201).json({ status: 'success', payload: result })
}

export const deleteAllProductsController = async (req, res) => {
    const cid = req.params.cid

    const result = await cartService.deleteAll(cid)
    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1, 4))).json({ error: result.slice(6) })
    }
    res.status(201).json({ status: 'success', payload: result })
}

export const purchaseCartController = async (req, res) => {
    const cid = req.params.cid

    const cart = await cartService.getById(cid)

    let products = []
    let productsToBuy = [] //este va a ser el array que tenga los productos que compró el usuario.

    products = await Promise.all(cart.products.map(async (prod) => {
        const pid = prod._id._id
        const purchasesCompleted = await productService.updateStock(pid, prod.quantity)
        productsToBuy.push({ ...prod, quantity: purchasesCompleted })
        return { ...prod, quantity: prod.quantity - purchasesCompleted }
    }))

    productsToBuy = productsToBuy.filter(prod => prod.quantity > 0)

    //actualizar el carrito, eliminar del carrito los productos que tengan quantity 0

    for (const prod of products) {
        if (prod.quantity === 0) {
            await cartService.delete(cid, prod._id._id)
        } else {
            await cartService.updateQuantity(cid, prod._id._id, prod.quantity)
        }
    }

    if (!productsToBuy.length) {
        return res.status(400).json({ error: "Sin stock para ningún producto en el carrito." })
    }

    let amount = 0;

    productsToBuy.forEach(prod => {
        amount += prod.quantity * prod._id.price
    })

    const newTicket = {
        amount,
        purchaser: req.session.user.email
    }

    const result = await ticketService.create(newTicket)

    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1, 4))).json({ error: result.slice(6) })
    }
    res.status(201).json({ status: 'success', payload: result })
}


// views

export const getCartByIdViewController = async (req, res) => {
    const cid = req.params.cid
    const result = await cartService.getById(cid)
    if (typeof result == 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1, 4))).json({ error: result.slice(6) })
    }

    res.render('cart', { cart: result })

}

