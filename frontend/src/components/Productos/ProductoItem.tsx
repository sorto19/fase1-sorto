import React from "react";
import ReactPlayer from "react-player";
import {useHistory} from 'react-router-dom'

import * as productoService from "./productoService";
import { Producto } from "./Producto";

import "./ProductoItem.css";

interface Props {
  producto: Producto;
  loadProductos: () => void;
}

const ProductoItem = (props: Props) => {
  const { producto, loadProductos } = props;

  const history = useHistory();

  const handleDelete = async (id: string) => {
    await productoService.deleteProductoById(id);
    loadProductos();
  };

  return (
    <div className="col-md-4 p-2">
      <div
        className="card card-body video-card animate__animated animate__backInUp"
        style={{ cursor: "pointer" }}
        onClick={() => history.push(`/update/${producto._id}`)}
      >
        <div className="d-flex justify-content-between">
          <h5>{producto.nombre}</h5>
          <span
            className="text-danger"
            onClick={() => video._id && handleDelete(producto._id)}
          >
            X
          </span>
        </div>
        <p>{producto.precio}</p>
        <p>{producto.cantidad}</p>
        <p>{producto.description}</p>
        <p>{producto.categoria}</p>
        <div className="embed-responsive embed-responsive-16by9">
          <ReactPlayer url={producto.url} />
        </div>
      </div>
    </div>
  );
};

export default ProductoItem;
