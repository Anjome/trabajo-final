import express from "express"
import { connectDb } from "./config/connectMongooDb"
import { productRouter } from "./routes/productRouter"
import { authRouter } from "./routes/authRouter"
import cors from "cors"
import { protect } from "./middleware/auth"
import jwt from "jsonwebtoken"


process.loadEnvFile()

const PORT = process.env.PORT || 1234

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/auth", authRouter)



app.use("/api/products", productRouter)


app.listen(PORT, () => {
    console.log(`✅Servidor HTTP en funcionamiento en el puerto ${PORT}.`)
    connectDb()
})

