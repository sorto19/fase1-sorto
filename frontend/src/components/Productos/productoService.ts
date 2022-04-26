import axios from "axios";
import { Producto } from "./Producto";

const API = process.env.REACT_APP_API;

export const getProductos = async () => {
  return await axios.get<Producto[]>(`${API}/videos`);
};

export const getProductoById = async (id: string) => {
  return await axios.get<Producto>(`${API}/productos/${id}`);
};

export const createNewProducto = async (producto: Producto) => {
  return await axios.post(`${API}/productos`, producto);
};

export const deleteProductoById = async (id: string) => {
  return await axios.delete(`${API}/productos/${id}`);
};

export const updateProducto = async (id: string, producto: Producto) => {
  return await axios.put(`${API}/productos/${id}`, producto);
};
