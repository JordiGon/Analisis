export const initialState = {
  usuario: {
    nombreCompleto: "",
    email: "",
    username: "",
    foto: "",
  },
  autenticado: false,
};

const sesionUsuarioReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INICIAR_SESION": {
      return {
        ...state,
        usuario: action.sesion,
        autenticado: action.autenticado,
      };
    }
    case "SALIR_SECION": {
      return {
        ...state,
        usuario: action.nuevoUsuario,
        autenticado: action.autenticado,
      };
    }
    case "ACTUALIZAR USUARIO": {
      return {
        ...state,
        usuario: action.nuevoUsuario,
        autenticado: action.autenticado,
      };
    }
  }
};

export default sesionUsuarioReducer;
