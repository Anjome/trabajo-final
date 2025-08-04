import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
process.loadEnvFile()


let permiso = "test-del-token"

const protect = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    try {
        const header = req.headers.authorization
        const token = header?.split(" ")[1]


        if (!token) {
            return res.status(401).json({
                success: false,
                message: "token is required"
            })
        }

        const secreyKey = process.env.JWT_SECRET!

        const decode = jwt.verify(token, secreyKey)

        if (decode) {
            console.log("puedes pasar")
            next()
        }
    } catch (error) {
        const err = error as Error
        if (err.message === "invalid signature") {
            return res.status(500).json({
                success: false,
                message: "Invalid secret key"
            })
        }
        res.status(500).json({
            success: false,
            message: "Jsonwebtoken expired"
        })
    }
}
export { protect }




