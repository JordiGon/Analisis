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
const IngresarCliente = (props) => {
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    nombreUsuario: "",
    nit: "",
    correo: "",
    contrasena: "",
    tarjeta: "",
    nombreTarjeta: "",
  });

  const ingresarVal = (e) => {
    const { name, value } = e.target;
    setCliente((props) => ({
      ...props,
      [name]: value,
    }));
  };
  const addCliente = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/Cliente", cliente)
      .then(function (response) {
        console.log(response);
        props.history.push("/clientes/ver");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Ingresar Cliente
        </Typography>
      </div>
      <form style={style.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              name="nombre"
              variant="outlined"
              value={cliente.nombre}
              onChange={ingresarVal}
              fullWidth
              label="Ingrese nombre"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="apellido"
              variant="outlined"
              value={cliente.apellido}
              onChange={ingresarVal}
              fullWidth
              label="Ingrese apellido"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="nombreUsuario"
              variant="outlined"
              value={cliente.nombreUsuario}
              onChange={ingresarVal}
              fullWidth
              label="Ingrese username"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="nit"
              variant="outlined"
              value={cliente.nit}
              onChange={ingresarVal}
              fullWidth
              label="Ingrese nit"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="correo"
              variant="outlined"
              value={cliente.correo}
              onChange={ingresarVal}
              fullWidth
              label="Ingrese email"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="contrasena"
              variant="outlined"
              type="password"
              value={cliente.contrasena}
              onChange={ingresarVal}
              fullWidth
              label="Ingrese contrasena"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="nombreTarjeta"
              variant="outlined"
              value={cliente.nombreTarjeta}
              onChange={ingresarVal}
              fullWidth
              label="Ingrese nombre tarjeta"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="tarjeta"
              variant="outlined"
              value={cliente.tarjeta}
              onChange={ingresarVal}
              fullWidth
              label="Ingrese numero tarjeta"
            />
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={addCliente}
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

export default withRouter(IngresarCliente);
