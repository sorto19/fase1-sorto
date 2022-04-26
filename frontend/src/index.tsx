import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import "bootswatch/dist/pulse/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import 'animate.css/animate.min.css';
import "./index.css";

import Navbar from "./components/Navbar/Navbar";
import ProductoList from "./components/Productos/ProductoList";
import ProductoForm from "./components/Productos/ProductoForm";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />

      <div className="container p-4">
        <Switch>
          <Route exact path={["/", "/productos"]} component={ProductoList} />
          <Route path="/new-producto" component={ProductoForm} />
          <Route path="/update/:id" component={ProductoForm} />
        </Switch>
        <ToastContainer />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);


serviceWorker.unregister();
