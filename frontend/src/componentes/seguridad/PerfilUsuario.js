import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  actualizarUsuario,
  obtenerUsuarioActual,
} from "../../actions/UsuarioAction";
import { useStateValue } from "../../contexto/store";
import style from "../Tool/Style";

const PerfilUsuario = () => {
  const [{ sesionUsuario }, dispatch] = useStateValue();

  const [usuario, setUsuario] = useState({
    nombreCompleto: "",
    email: "",
    password: "",
    username: "",
    confirmarPassword: "",
  });

  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setUsuario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  useEffect(() => {
    obtenerUsuarioActual(dispatch).then((response) => {
      console.log(
        "esta es la data del objeto response del usuario actual",
        response
      );
      setUsuario(response.data);
    });
  }, []);

  const guardarUsuario = (e) => {
    e.preventDefault();
    actualizarUsuario(usuario).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "se guardaaron exitosamente los cambios en el perfil",
          },
        });

        window.localStorage.setItem("token_seguridad", response.data.tokem);
      }
    });
  };
  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Perfil de usuario
        </Typography>
      </div>
      <form style={style.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              name="nombreCompleto"
              variant="outlined"
              value={usuario.nombreCompleto}
              onChange={ingresarValoresMemoria}
              fullWidth
              label="Ingrese nombres"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="email"
              name="email"
              variant="outlined"
              value={usuario.email}
              onChange={ingresarValoresMemoria}
              fullWidth
              label="Ingrese email"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              name="username"
              variant="outlined"
              value={usuario.username}
              onChange={ingresarValoresMemoria}
              fullWidth
              label="Ingrese username"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="password"
              name="password"
              value={usuario.password}
              variant="outlined"
              onChange={ingresarValoresMemoria}
              fullWidth
              label="Ingrese password"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="password"
              name="confirmarPassword"
              variant="outlined"
              value={usuario.confirmarPassword}
              onChange={ingresarValoresMemoria}
              fullWidth
              label="Confirmar password"
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <Button
              type="submit"
              onClick={guardarUsuario}
              fullWidth
              variant="contained"
              size="large"
              color="primary"
              style={style.submit}
            >
              Guardar datos
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default PerfilUsuario;
