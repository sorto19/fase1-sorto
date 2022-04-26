import { Response, Request, NextFunction } from "express";
import Producto from "../models/producto.model";
import { CreateProductoType } from "../schema/producto.schema";

export const createProducto = async (
  req: Request<unknown, unknown, CreateProductoType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nombre, precio, cantidad,  description, categoria, producto } = req.body;

    // search an existing product with the same name
    const productoFound = await Producto.findOne({ nombre });

    // if a video with the same title is found
    if (productoFound)
      return res.status(400).json({ message: "product already exists" });

    // create a new video
    const newproducto = new Producto({ nombre, precio, cantidad, description, categoria});

    // create an slug from title
    newproducto.slug = newproducto.nombre.toLowerCase().replace(/\s/g, "-");

    const savedProducto = await newproducto.save();

    res.json(savedProducto);
  } catch (error) {
    next(error);
  }
};

export const getProductos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productos = await Producto.find();
    return res.json(productos);
  } catch (error) {
    next(error);
  }
};

export const getProducto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productFound = await Producto.findById(req.params.id);
    if (!productFound) return res.status(204).json();
    return res.json(productFound);
  } catch (error) {
    next(error);
  }
};

export const deleteProducto = async (req: Request, res: Response) => {
  const productFound = await Producto.findByIdAndDelete(req.params.id);

  if (!productFound) return res.status(204).json();

  return res.status(204).json();
};

export const updateProductos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const ProductoUpdated = await Producto.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!ProductoUpdated) return res.status(204).json();
  return res.json(ProductoUpdated);
};
