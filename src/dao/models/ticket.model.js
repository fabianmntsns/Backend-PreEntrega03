import mongoose from "mongoose";

const ticketCollection = 'ticket'

const ticketSchema = new mongoose.Schema({

    code: {
        type: String, required: true, unique: true,
        default: function () { // la funcion se encuentra mas abajo
            return uniqueCode()
        }
    },
    amount: { type: Number },
    purchaser: { type: String, ref: "users" },
},
    {
        timestamps: {
            createdAt: 'purchase_datetime',
            updatedAt: false
        }
    });


mongoose.set("strictQuery", false);

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

function uniqueCode() {

    const timestamp = new Date().getTime(); // Genera un código único usando un timestamp
    return `CODE_${timestamp}`;
}

export default ticketModel;