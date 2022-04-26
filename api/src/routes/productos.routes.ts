import { Router } from "express";
const router = Router();

import {
  createProducto,
  deleteProducto,
  getProducto,
  getProductos,
  updateProductos,
} from "../controllers/productos.controller";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { CreateProductoSchema } from "../schema/producto.schema";

router.get("/productos", getProductos);

router.get("/productos/:id", getProducto);

router.post("/productos", validateSchema(CreateProductoSchema), createProducto);

router.delete("/productos/:id", deleteProducto);

router.put("/productos/:id", updateProductos);

export default router;
