import { Router } from "express";
import logger from "../logger.js";

const router = Router()


router.get('/loggerTest', (req, res )  => {
    logger.error('Test de logger error')
    logger.info('Test de logger info')
    logger.debug('Test de logger debug')
    logger.http('Test de logger http')
    logger.warning('Test de logger warning')
    logger.fatal('Test de logger fatal')
    res.send('loggers')
})


export default router