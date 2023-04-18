import { Button, Container, Grid } from "@material-ui/core";
import axios from "axios";
import style from "../Tool/Style";
import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";

const Productos = (props) => {
  const [productos, getProductos] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/Producto").then((resultado) => {
      getProductos(resultado.data);
    });
  }, []);

  const [categoria, getcategorias] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/Categoria").then((resultado) => {
      getcategorias(resultado.data);
    });
  }, []);
  productos.map((info) => {
    categoria.map((cat) => {
      if (info.categoriaId === cat.categoriaId) {
        info.categoria = cat.nombreCategoria;
        console.log(info);
      }
    });
  });
  const columnas = [
    {
      title: "id",
      field: "productoId",
    },
    {
      title: "Nombre producto",
      field: "nombre",
    },
    {
      title: "Descripcion",
      field: "descripcion",
    },
    {
      title: "Precio",
      field: "precio",
    },
    {
      title: "Descuento",
      field: "descuento",
    },
    {
      title: "Categoria",
      field: "categoria",
    },
  ];

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.table_div}>
        <Grid style={style.gridBoton}>
          <Button
            component={Link}
            button
            to="/producto/ingresar"
            variant="contained"
            color="primary"
            style={style.botonAgregar}
          >
            Agregar Producto
          </Button>
        </Grid>
        <MaterialTable
          style={style.table}
          columns={columnas}
          data={productos}
          title="Productos registrados"
        ></MaterialTable>
      </div>
    </Container>
  );
};

export default Productos;
