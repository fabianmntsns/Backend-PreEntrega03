import mongoose from "mongoose";

const userPasswordCollection = "userPasswords"

const userPasswordSchema = new mongoose.Schema({
    email: { type: String, ref: "users " },
    token: { type: String, required: true },
    isUsed: { type: String, required: false},
    createdAt: { type: String, default: Date.now, expireAfterSeconds: 3600 },

})

mongoose.set("strictQuery", false)

const userPasswordModel= mongoose.model(userPasswordCollection, userPasswordSchema)

export default userPasswordModel