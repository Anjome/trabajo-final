
import { Request, Response } from "express"
import { Product } from "../models/productModel"

const getAllProducts = async (req: Request, res: Response): Promise<any> => {
    try {
        const products = await Product.find()
        res.json({
            success: true,
            message: "Obteniendo los productos",
            data: products
        })
    } catch (error) {
        const err = error as Error
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const addNewProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body
        const newProduct = new Product(body)
        await newProduct.save()

        res.status(201).json({
            success: true,
            message: "Producto creado con éxito.",
            data: newProduct
        })

    } catch (error) {
        const err = error as Error
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const deleteProduct = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id
    try {
        const deleteProduct = await Product.findByIdAndDelete(id)
        if (!deleteProduct) return res.status(404).json({
            success: false,
            message: "Producto no encontrado"
        })

        res.json({
            success: true,
            message: "Producto Borrado con éxito",
            data: deleteProduct
        })

    } catch (error) {
        const err = error as Error
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const updateProduct = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id
    const body = req.body

    try {
        const updateProduct = await Product.findByIdAndUpdate(id, body, { new: true })
        if (!updateProduct) return res.status(400).json({
            success: false,
            message: "Producto no encontrado"
        })
        res.json({
            success: true,
            message: "Producto actualizado con éxito",
            data: updateProduct
        }

        )

    } catch (error) {
        const err = error as Error
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getNameProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { search } = req.query;

        if (!search || typeof search !== "string") {
            return res.status(400).json({
                success: false,
                message: "El parámetro 'search' es obligatorio y debe ser string."
            });
        }

        const products = await Product.find({
            name: { $regex: search, $options: "i" }
        });

        res.status(200).json({
            success: true,
            message: `Productos que coinciden con '${search}'`,
            data: products
        });

    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


export { getAllProducts, addNewProduct, deleteProduct, updateProduct, getNameProduct }