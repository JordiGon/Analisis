import { Button, Container, Grid } from "@material-ui/core";
import axios from "axios";
import style from "../Tool/Style";
import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";

const Movimientos = (props) => {
  const [Movimientos, getMovimientos] = useState([]);
  const [Bodegas, getBodegas] = useState([]);
  const [Productos, getProductos] = useState([]);
  const [tiposMovimiento, gettipoMovimiento] = useState([]);
  const producto = async () => {
    await axios.get("http://localhost:5000/api/producto").then((resultado) => {
      getProductos(resultado.data);
    });
  };
  const movimiento = async () => {
    await axios
      .get("http://localhost:5000/api/Movimientos")
      .then((resultado) => {
        getMovimientos(resultado.data);
      });
  };
  const Bodega = async () => {
    await axios.get("http://localhost:5000/api/Bodega").then((resultado) => {
      getBodegas(resultado.data);
    });
  };
  const tipoMovimiento = async () => {
    await axios
      .get("http://localhost:5000/api/TipoMovimiento")
      .then((resultado) => {
        gettipoMovimiento(resultado.data);
      });
  };
  useEffect(() => {
    producto();
    movimiento();
    tipoMovimiento();
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
  var obj3 = tiposMovimiento.reduce(function (acc, cur, i) {
    acc[cur.tipoMovimientoId] = cur.descripcion;
    return acc;
  }, {});

  const columnas = [
    {
      title: "id",
      field: "movimientosId",
      filtering: false,
    },
    {
      title: "Movimiento",
      field: "tipoMovimientoId",
      lookup: obj3,
    },
    {
      title: "Bodega Raiz",
      field: "bodegaId",
      lookup: obj1,
    },
    {
      title: "Bodega Destino",
      field: "bodegaId2",
      lookup: obj1,
    },
    {
      title: "Producto",
      field: "productoId",
      lookup: obj2,
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
        <MaterialTable
          style={style.table}
          columns={columnas}
          options={{ filtering: true }}
          data={Movimientos}
          title="Movimientos registrados"
        ></MaterialTable>
      </div>
    </Container>
  );
};

export default Movimientos;
