import { Router } from "express";
import { generateProductsMock } from "../utils.js";

const router = Router()


router.get('/mockingproducts', async(req, res) => {
    const productsMock = []
    for (let index = 0; index < 100; index++) {
        productsMock.push(generateProductsMock()) 
    }
    res.send({ status: 'success', payload: productsMock })
})

export default router 