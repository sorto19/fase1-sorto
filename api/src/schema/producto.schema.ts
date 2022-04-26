import fileUpload, { FileArray } from "express-fileupload";
import { z } from "zod";

export const CreateProductoSchema = z.object({
  body: z.object({
    nombre: z.string().nonempty(),
    precio: z.string().optional(),
    description: z.string().optional(),
    cantidad: z.string().optional(),
    categoria: z.string().optional(),



    producto: z.any(),
  }),
});

export type CreateProductoType = z.infer<typeof CreateProductoSchema>["body"];
