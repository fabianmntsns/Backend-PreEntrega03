import mongoose from "mongoose";

class UserManagerMongoDB {

    async getUser(parameter, UserModel) {
        try {
            return await UserModel.findOne(parameter)
        } catch (e) {
            return "[400] " + e.message
        }

    }

    async getUserById(id, UserModel) {
        try {
            return await UserModel.findOne({ id })
        } catch (e) {
            return "[400] " + e.message
        }

    }

    async addUser(newUser, UserModel) {
        try {
            return await UserModel.create(newUser)

        } catch (e) {
            return "[400] " + e.message
        }
    }
}

export default UserManagerMongoDB