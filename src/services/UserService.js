import UserManagerMongoDB from "../dao/managers/userManagerMongoDB.js";
import UserModel from "../dao/models/user.model.js";
import UserRepository from "../repositories/UserRepository.js";


class UserService extends UserRepository {
    constructor(dao) {
        super(dao, UserModel)
    }
}

export const userService = new UserService(new UserManagerMongoDB())
