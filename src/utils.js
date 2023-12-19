import bcrypt from 'bcrypt'
import { fakerES as faker } from '@faker-js/faker';


//helper function
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

//helper function
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

export const generateProductsMock = () => {
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price() ,
        thumbnail: faker.image.urlLoremFlickr({ category: 'business' }),
        stock:faker.number.int(20),
        code: faker.database.mongodbObjectId(),
        description:faker.commerce.productDescription(),
        category: faker.commerce.productMaterial(),
       // status: faker.internet.httpStatusCode(),

    }
}


export const generateRandomString = (num) => {
    return [...Array(num)].map(() => {
        const randomNum = (Math.random() * 36);
        return randomNum.toString(36)
    })

    .join('')
    .toUpperCase();
}