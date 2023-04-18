import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import style from "../Tool/Style";
import React, { useState } from "react";
import { registrarUsuariobd } from "../../actions/UsuarioAction";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

export const RegistrarUsuario = (props) => {
  const [alerta, activar] = useState(false);
  const [usuario, setUsuario] = useState({
    NombreCompleto: "",
    email: "",
    username: "",
    password: "",
    confirmacionpassword: "",
  });

  const ingresarValores = (e) => {
    const { name, value } = e.target;
    setUsuario((props) => ({
      ...props,
      [name]: value,
    }));
  };

  const ingresarusuario = (e) => {
    e.preventDefault();
    if (usuario.password !== usuario.confirmacionpassword) {
      activar(true);
    } else {
      activar(false);
      registrarUsuariobd(usuario).then((response) => {
        console.log("Se registro exitosamente el usuario", response);
        window.localStorage.setItem("token_seguridad", response.data.tokem);
      });
    }
  };

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Registro de usuario
        </Typography>
        <form style={style.form}>
          {alerta ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              La confirmacion de contraseña ha sido erronea
              <strong> Revisala!</strong>
            </Alert>
          ) : (
            ""
          )}
          <Grid container spacing={2} margin="normal">
            <Grid item xs={12} md={12}>
              <TextField
                name="NombreCompleto"
                variant="outlined"
                value={usuario.NombreCompleto}
                style={{ textTransform: "uppercase" }}
                onChange={ingresarValores}
                fullWidth
                label="Ingrese su nombre"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="email"
                variant="outlined"
                value={usuario.email}
                onChange={ingresarValores}
                fullWidth
                label="Ingrese su email"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="username"
                variant="outlined"
                value={usuario.username}
                onChange={ingresarValores}
                fullWidth
                label="Ingrese su username"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="password"
                type="password"
                variant="outlined"
                value={usuario.password}
                onChange={ingresarValores}
                fullWidth
                label="Ingrese su password"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="confirmacionpassword"
                type="password"
                variant="outlined"
                value={usuario.confirmacionpassword}
                onChange={ingresarValores}
                fullWidth
                label="confirme su password"
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={ingresarusuario}
                color="primary"
                size="large"
                style={style.submit}
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default RegistrarUsuario;
