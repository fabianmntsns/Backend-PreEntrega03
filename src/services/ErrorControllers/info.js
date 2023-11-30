export const generateErrorInfo = product => {
    return `
    Uno o mas properties están incompletos o son inválidos.
    Lista de propiedades obligatorias:
        - title: Must be a string. (${product.title})
        - price: Must be a integer. (${product.price})
    `
}
