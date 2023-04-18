import { Button, Container, Grid } from "@material-ui/core";
import axios from "axios";
import style from "../Tool/Style";
import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { clientesBd } from "../../actions/UsuarioAction";
import { Link } from "react-router-dom";
const Proveedores = (props) => {
  const [Proveedor, getProveedores] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/Proveedor").then((resultado) => {
      getProveedores(resultado.data);
    });
  }, []);
  //   {
  //     "proveedorId": 2,
  //     "nombre": "Yeo Carter",
  //     "direccion": "516-8678 Amet, Av.",
  //     "telefono": "1-573-949-0214",
  //     "fechaInicio": "2021-03-30T00:00:00",
  //     "email": "est.nunc.laoreet@pede.ca",
  //     "existenciasproveedor": null
  //   },
  const columnas = [
    {
      title: "Id",
      field: "proveedorId",
    },
    {
      title: "Nombre bodega",
      field: "nombre",
    },
    {
      title: "Apellido",
      field: "direccion",
    },
    {
      title: "Fecha",
      field: "fechaInicio",
    },
    {
      title: "Telefono",
      field: "telefono",
    },
    {
      title: "Correo electronico",
      field: "email",
    },
  ];
  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.table_div}>
        <Grid style={style.gridBoton}>
          <Button
            component={Link}
            button
            to="/proveedor/ingresar"
            variant="contained"
            color="primary"
            style={style.botonAgregar}
          >
            Agregar Proveedor
          </Button>
        </Grid>
        <MaterialTable
          style={style.table}
          columns={columnas}
          data={Proveedor}
          title="Proveedores registrados"
        ></MaterialTable>
      </div>
    </Container>
  );
};

export default Proveedores;
