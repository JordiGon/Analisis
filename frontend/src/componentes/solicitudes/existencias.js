import { Button, Container, Grid } from "@material-ui/core";
import axios from "axios";
import style from "../Tool/Style";
import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";

const VerExistencias = (props) => {
  const [Existencias, getExistencias] = useState([]);
  const [Bodegas, getBodegas] = useState([]);
  const [Productos, getProductos] = useState([]);
  const [Proveedores, getProveedor] = useState([]);
  const producto = async () => {
    await axios.get("http://localhost:5000/api/producto").then((resultado) => {
      getProductos(resultado.data);
    });
  };
  const proveedor = async () => {
    await axios.get("http://localhost:5000/api/proveedor").then((response) => {
      getProveedor(response.data);
    });
  };
  const existencia = async () => {
    await axios
      .get("http://localhost:5000/api/Existencias")
      .then((resultado) => {
        getExistencias(resultado.data);
      });
  };
  const Bodega = async () => {
    await axios.get("http://localhost:5000/api/Bodega").then((resultado) => {
      getBodegas(resultado.data);
    });
  };

  useEffect(() => {
    producto();
    proveedor();
    existencia();
    Bodega();
  }, []);
  var obj1 = Bodegas.reduce(function (acc, cur, i) {
    cur.bodegaId != 0
      ? (acc[cur.bodegaId] = cur.nombre)
      : console.log("bodega und");
    return acc;
  }, {});
  var obj2 = Productos.reduce(function (acc, cur, i) {
    acc[cur.productoId] = cur.nombre;
    return acc;
  }, {});
  var obj3 = Proveedores.reduce(function (acc, cur, i) {
    acc[cur.proveedorId] = cur.nombre;
    return acc;
  }, {});
  let auxArray = Existencias.filter(function (props) {
    return props.cantidad != 0;
  });
  const columnas = [
    {
      title: "id",
      field: "existenciasId",
      filtering: false,
    },
    {
      title: "Bodega",
      field: "bodegaId",
      lookup: obj1,
    },
    {
      title: "Producto",
      field: "productoId",
      lookup: obj2,
    },
    {
      title: "Proveedor",
      field: "proveedorId",
      lookup: obj3,
    },
    {
      title: "Cantidad",
      field: "cantidad",
      filtering: false,
    },
  ];

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.table_div}>
        <Grid style={style.gridBoton}>
          <Button
            component={Link}
            button
            to="/Existencias/ingresar"
            variant="contained"
            color="primary"
            style={style.botonAgregar}
          >
            Agregar Existencias
          </Button>
        </Grid>
        <MaterialTable
          style={style.table}
          columns={columnas}
          options={{ filtering: true }}
          data={auxArray}
          title="Existencias de productos"
        ></MaterialTable>
      </div>
    </Container>
  );
};

export default VerExistencias;
