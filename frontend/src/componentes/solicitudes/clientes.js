import { Button, Container, Grid } from "@material-ui/core";
import axios from "axios";
import style from "../Tool/Style";
import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { clientesBd } from "../../actions/UsuarioAction";
import { Link } from "react-router-dom";
const Clientes = (props) => {
  const [user, getclientes] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/Cliente").then((resultado) => {
      getclientes(resultado.data);
    });
  }, []);
  const columnas = [
    {
      title: "id",
      field: "clienteId",
    },
    {
      title: "Nombre",
      field: "nombre",
    },
    {
      title: "Apellido",
      field: "apellido",
    },
    {
      title: "Nombre de usuario",
      field: "nombreUsuario",
    },
    {
      title: "NIT",
      field: "nit",
    },
    {
      title: "E-mail",
      field: "correo",
    },
  ];

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.table_div}>
        <Grid style={style.gridBoton}>
          <Button
            component={Link}
            button
            to="/clientes/ingresar"
            variant="contained"
            color="primary"
            style={style.botonAgregar}
          >
            Agregar Cliente
          </Button>
        </Grid>
        <MaterialTable
          style={style.table}
          columns={columnas}
          data={user}
          title="Clientes registrados"
        ></MaterialTable>
      </div>
    </Container>
  );
};

export default Clientes;
