class UserRepository {
    constructor(dao, model) {
        this.dao = dao
        this.model = model
    }

    get = async (data) => {
        return await this.dao.getUser(data, this.model)
    }

    create = async(data) => {
        return await this.dao.addUser(data, this.model)
    }
}

export default UserRepository