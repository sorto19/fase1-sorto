import React, { useEffect, useState } from "react";
import * as productoService from "./productoService";

import { Producto } from "./Producto";
import ProductoItem from "./ProductoItem";

const ProductoList = () => {
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState<Producto[]>([]);

  const loadProductos = async () => {
    const res = await productoService.getProductos();

    const formatedProductos = res.data
      .map((producto) => {
        return {
          ...producto,
          createdAt: producto.createdAt ? new Date(producto.createdAt) : new Date(),
          updatedAt: producto.updatedAt ? new Date(producto.updatedAt) : new Date(),
        };
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    setProductos(formatedProductos);
    setLoading(false);
  };

  useEffect(() => {
    loadProductos();
  }, []);

  if (loading)
    return (
      <div className="row">
        <div className="col-md-12 my-auto">
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );

  if (productos.length === 0) return <div>there are no products yet</div>;

  return (
    <div className="row">
      {productos.map((producto) => (
        <ProductoItem producto={producto} key={producto._id} loadProductos={loadProductos} />
      ))}
    </div>
  );
};

export default ProductoList;
