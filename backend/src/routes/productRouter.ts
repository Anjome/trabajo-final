
import { Router } from "express"
import { addNewProduct, getAllProducts, deleteProduct, updateProduct } from "../controller/productsController"

const productRouter = Router()

productRouter.get("/", getAllProducts)
productRouter.post("/", addNewProduct)
productRouter.patch("/:id", updateProduct)
productRouter.delete("/:id", deleteProduct)

export { productRouter }