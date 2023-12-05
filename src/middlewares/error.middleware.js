import EErrors from "../services/ErrorControllers/enums.js";


export default(error, req, res, next) => {
    logger.info("error cause", error.cause);
    logger.error("Error message:", error.message);

    switch (error.code) {
        case EErrors.INVALID_DATA:
            res.status(400).send({ status: 'error', error: error.name})
            break;
        default:
            res.send({ status: 'error', error: 'Unhandled error'})
            break;
    }
}