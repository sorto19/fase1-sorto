import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import * as productoService from "./productoService";
import { Producto } from "./Producto";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface Params {
  id?: string;
}

const ProductoForm = () => {
  const initialState = {
    nombre: "",
    precio: "",
    cantidad: "",
    description: "",
    categoria: "",

    url: "",
  };

  const [producto, setProducto] = useState<Producto>(initialState);

  const history = useHistory();
  const params = useParams<Params>();

  const getProducto = async (id: string) => {
    const res = await productoService.getProductoById(id);
    const { nombre, precio, cantidad, description, categoria, url } = res.data;
    setProducto({ nombre, precio, cantidad, description, categoria, url });
  };

  useEffect(() => {
    if (params.id) getProducto(params.id);
  }, [params.id]);

  const handleInputChange = (e: InputChange) =>
    setProducto({ <div className="producto"></div>[e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!params.id) {
      await productoService.createNewProducto(producto);
      setProducto(initialState);
      toast.success("New Producto Added");
    } else {
      await productoService.updateProducto(params.id, producto);
    }
    history.push("/productos");
  };

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card my-auto">
          <div className="card-body">
            <h3>New Producto</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Write a name for this product"
                  className="form-control"
                  autoFocus
                  onChange={handleInputChange}
                  value={producto.nombre}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="precio"
                  placeholder=" price"
                  className="form-control"
                  autoFocus
                  onChange={handleInputChange}
                  value={producto.precio}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="cantidad"
                  placeholder="amount"
                  className="form-control"
                  autoFocus
                  onChange={handleInputChange}
                  value={producto.cantidad}
                />
              </div>
             
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="cayegoria"
                  placeholder="category"
                  className="form-control"
                  autoFocus
                  onChange={handleInputChange}
                  value={producto.categoria}
                />
              </div>
           

              <div className="form-group">
                <input
                  type="text"
                  name="url"
                  placeholder="https://somesite.com"
                  className="form-control"
                  onChange={handleInputChange}
                  value={producto.url}
                />
              </div>

              <div className="form-group">
                <textarea
                  name="description"
                  rows={6}
                  className="form-control"
                  placeholder="Write a description"
                  onChange={handleInputChange}
                  value={producto.description}
                ></textarea>
              </div>

              {params.id ? (
                <button className="btn btn-info">Update</button>
              ) : (
                <button className="btn btn-primary">Create</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoForm;
