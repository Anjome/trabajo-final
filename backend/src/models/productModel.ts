import { model, Schema } from "mongoose"

const productSchema = new Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, default: 0 },
    category: { type: String, required: true, enum: ["Almacen", "Limpieza"] },
}, {
    versionKey: false
})
const Product = model("Product", productSchema)

export { Product }