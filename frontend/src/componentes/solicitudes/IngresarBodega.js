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
const IngresarBodega = (props) => {
  const [Bodega, setBodega] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
  });
  //   {
  //     "nombre": "string",
  //     "direccion": "string",
  //     "telefono": "string",
  //     "email": "user@example.com"
  //   }
  const ingresarVal = (e) => {
    const { name, value } = e.target;
    setBodega((props) => ({
      ...props,
      [name]: value,
    }));
  };

  const addBodega = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/Bodega", Bodega)
      .then(function (response) {
        console.log(response);
        props.history.push("/Bodega/ver");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Ingresar Bodega
        </Typography>
      </div>
      <form style={style.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              name="nombre"
              variant="outlined"
              value={Bodega.nombre}
              onChange={ingresarVal}
              fullWidth
              label="Ingrese nombre"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="direccion"
              variant="outlined"
              value={Bodega.direccion}
              onChange={ingresarVal}
              fullWidth
              label="Ingrese direccion"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="telefono"
              variant="outlined"
              value={Bodega.telefono}
              onChange={ingresarVal}
              fullWidth
              label="Ingrese telefono"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="email"
              variant="outlined"
              value={Bodega.email}
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
                onClick={addBodega}
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

export default withRouter(IngresarBodega);
