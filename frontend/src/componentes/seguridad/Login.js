import React, { useState } from "react";
import style from "../Tool/Style";
import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { loginUsuario } from "../../actions/UsuarioAction";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { useStateValue } from "../../contexto/store";

const Login = (props) => {
  const [{ usuarioSesion }, dispatch] = useStateValue();
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setUsuario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };
  const loginUser = (e) => {
    e.preventDefault();
    loginUsuario(usuario, dispatch).then((response) => {
      if (response.status == 200) {
        window.localStorage.setItem("token_seguridad", response.data.tokem);
        props.history.push("/auth/perfil");
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Las credenciales del usuario son incorrectas",
          },
        });
      }
    });
  };
  return (
    <Container maxWidth="xs">
      <div style={style.paper}>
        <Avatar style={style.avatar}>
          <LockOutlinedIcon style={style.icon} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login de usuario
        </Typography>
        <form style={style.form}>
          <TextField
            variant="outlined"
            label="Ingrese email"
            name="email"
            value={usuario.email}
            onChange={ingresarValoresMemoria}
            fullWidth
            margin="normal"
          />
          <TextField
            variant="outlined"
            type="password"
            label="Ingrese Password"
            name="password"
            value={usuario.password}
            onChange={ingresarValoresMemoria}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            onClick={loginUser}
            fullWidth
            variant="contained"
            color="primary"
            style={style.submit}
          >
            Enviar
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default withRouter(Login);
