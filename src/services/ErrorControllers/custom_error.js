export default class CustomError {
    static createError({ name="Error", cause, message, code }) {
        logger.info("cause", cause)
        logger.info("message", message)
        logger.info("code", code)

        const error = new Error(message, { cause })
        error.name = name
        error.code = code
        return error
    }
}