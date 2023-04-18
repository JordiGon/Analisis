import {
  Button,
  Container,
  Dialog,
  DialogContentText,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useStateValue } from "../../contexto/store";
import { withRouter } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { registrarClientebd } from "../../actions/UsuarioAction";
import style from "../Tool/Style";
import DatePicker from "react-datepicker";
const IngresarProveedor = (props) => {
  const [Proveedor, setProveedor] = useState({
    nombre: "",
    direccion: "",
    fechaInicio: "",
    telefono: "",
    email: "",
  });
  //   {
  //     "nombre": "string",
  //     "direccion": "string",
  //     "telefono": "string",
  //     "fechaInicio": "2021-10-27T03:38:18.144Z",
  //     "email": "user@example.com"
  //   }

  const ingresarVal = (e) => {
    const { name, value } = e.target;
    setProveedor((props) => ({
      ...props,
      [name]: value,
    }));
  };

  const addProveedor = (e) => {
    e.preventDefault();
    var f = new Date();
    Proveedor.fechaInicio = f;
    console.log(Proveedor.fechaInicio);
    axios
      .post("http://localhost:5000/api/Proveedor", Proveedor)
      .then(function (response) {
        console.log(response);
        props.history.push("/Proveedor/ver");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Ingresar Proveedor
        </Typography>
      </div>
      <form style={style.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              name="nombre"
              variant="outlined"
              value={Proveedor.nombre}
              onChange={ingresarVal}
              fullWidth
              label="Ingrese nombre"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="direccion"
              variant="outlined"
              value={Proveedor.direccion}
              onChange={ingresarVal}
              fullWidth
              label="Ingrese direccion"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="telefono"
              variant="outlined"
              value={Proveedor.telefono}
              onChange={ingresarVal}
              fullWidth
              label="Ingrese telefono"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="email"
              variant="outlined"
              value={Proveedor.email}
              onChange={ingresarVal}
              fullWidth
              label="Ingrese email"
            />
          </Grid>

          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={addProveedor}
                size="large"
                color="primary"
                style={style.submit}
              >
                Guardar datos
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default withRouter(IngresarProveedor);
