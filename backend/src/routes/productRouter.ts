
import { Router } from "express"
import { addNewProduct, getAllProducts, deleteProduct, updateProduct, getNameProduct } from "../controller/productsController"

const productRouter = Router()

productRouter.get("/", getAllProducts)
productRouter.post("/", addNewProduct)
productRouter.patch("/:id", updateProduct)
productRouter.delete("/:id", deleteProduct)
productRouter.get("/search", getNameProduct);


export { productRouter }