import HttpCliente from "../servicios/HttpCliente";
import axios from "axios";

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;
//http://localhost:5000/api/Cliente

export const registrarUsuariobd = (usuario) => {
  return new Promise((resolve, eject) => {
    instancia.post("/Usuario/registrar", usuario).then((response) => {
      resolve(response);
    });
  });
};

export const registrarClientebd = (Cliente) => {
  return new Promise((resolve, eject) => {
    instancia.post("/Cliente", Cliente).then((response) => {
      resolve(response);
    });
  });
};

export const obtenerUsuarioActual = (dispatch) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get("/Usuario").then((response) => {
      dispatch({
        type: "INICIAR_SESION",
        sesion: response.data,
        autenticado: true,
      });
      resolve(response);
    });
  });
};

export const loginUsuario = (usuario, dispatch) => {
  return new Promise((resolve, eject) => {
    instancia
      .post("/Usuario/login", usuario)
      .then((response) => {
        // if(response.data && response.data.imagenPerfil){
        //   let fotoPerfil = response.data.imagenPerfil;
        //   const nuevoFile = 'data:image' + fotoPerfil.extension
        // }
        dispatch({
          type: "INICIAR_SESION",
          sesion: response.data,
          autenticado: true,
        });
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const actualizarUsuario = (usuario) => {
  return new Promise((resolve, eject) => {
    HttpCliente.put("/Usuario", usuario)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
