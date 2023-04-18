import { Button, Container, Grid } from "@material-ui/core";
import axios from "axios";
import style from "../Tool/Style";
import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { clientesBd } from "../../actions/UsuarioAction";
import { Link } from "react-router-dom";
const Bodegas = (props) => {
  const [bodega, getBodegas] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/Bodega").then((resultado) => {
      getBodegas(resultado.data);
    });
  }, []);
  //   {
  //     "bodegaId": 1,
  //     "nombre": "Giacomo Oliver",
  //     "direccion": "Ap #467-4660 Iaculis St.",
  //     "telefono": "1-755-175-2921",
  //     "email": "nisi.sem@pellentesquetincidunttempus.org",
  //     "existenciasbodega": null,
  //     "empleados": null,
  //     "movimientosbodega": null
  // }
  const columnas = [
    {
      title: "Id",
      field: "bodegaId",
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
            to="/bodega/ingresar"
            variant="contained"
            color="primary"
            style={style.botonAgregar}
          >
            Agregar Bodega
          </Button>
        </Grid>
        <MaterialTable
          style={style.table}
          columns={columnas}
          data={bodega}
          title="Bodegas registrados"
        ></MaterialTable>
      </div>
    </Container>
  );
};

export default Bodegas;
