import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

class ProductoURL {
  @prop({ type: String })
  url: string;

  @prop({ type: String })
  public_id: string;
}

@modelOptions({
  schemaOptions: {
    versionKey: false,
    timestamps: true,
  },
})
class Producto {
  @prop({ type: String, required: true, trim: true })
  nombre: string;

  @prop({ type: String, required: true, unique: true })
  slug: string;

  @prop({ type: String, trim: true })
  description: string;

  @prop({ type: () => ProductoURL })
  url: ProductoURL;
}

const ProductoModel = getModelForClass(Producto);
export default ProductoModel;
