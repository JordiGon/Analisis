import React, { useEffect, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";
import { RegistrarUsuario } from "./componentes/seguridad/Registrar";
import Login from "./componentes/seguridad/Login";
import IngresarCliente from "./componentes/solicitudes/IngresarCliente";
import PerfilUsuario from "./componentes/seguridad/PerfilUsuario";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid, Snackbar } from "@material-ui/core";
import AppNavBar from "./componentes/navegacion/AppNavBar";
import { useStateValue } from "./contexto/store";
import { obtenerUsuarioActual } from "./actions/UsuarioAction";
import Clientes from "./componentes/solicitudes/clientes";
import RutaSegura from "./componentes/navegacion/RutaSegura";
import IngresarProducto from "./componentes/solicitudes/IngresarProducto";
import Productos from "./componentes/solicitudes/producto";
import Bodegas from "./componentes/solicitudes/bodega";
import IngresarBodega from "./componentes/solicitudes/IngresarBodega";
import Proveedores from "./componentes/solicitudes/proveedores";
import IngresarProveedor from "./componentes/solicitudes/IngresarProveedor";
import trasladarProducto from "./componentes/solicitudes/trasladarProducto";
import Movimientos from "./componentes/solicitudes/movimientos";
import VerExistencias from "./componentes/solicitudes/existencias";
import IngresoExs from "./componentes/solicitudes/IngresarExistencias";
import RegistrarVenta from "./componentes/solicitudes/ventas";
import VerFacturas from "./componentes/solicitudes/verFacturas";
function App() {
  const [{ openSnackbar }, dispatch] = useStateValue();
  const [iniciaApp, setIniciaApp] = useState(false);
  useEffect(() => {
    if (!iniciaApp) {
      obtenerUsuarioActual(dispatch)
        .then((response) => {
          setIniciaApp(true);
        })
        .catch((error) => {
          setIniciaApp(true);
        });
    }
  }, [iniciaApp]);
  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar ? openSnackbar.open : false}
        autoHideDuration={3000}
        ContentProps={{ "aria-describedby": "message-id" }}
        message={
          <span id="message-id">
            {openSnackbar ? openSnackbar.mensaje : ""}
          </span>
        }
        onClose={() =>
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: false,
              mensaje: "",
            },
          })
        }
      ></Snackbar>
      <Router>
        <MuiThemeProvider theme={theme}>
          <AppNavBar />
          <Grid container>
            <Switch>
              <RutaSegura exact path="/auth/perfil" component={PerfilUsuario} />
              <RutaSegura exact path="/clientes/ver" component={Clientes} />
              <RutaSegura exact path="/Proveedor/ver" component={Proveedores} />
              <RutaSegura exact path="/ventas/ver" component={RegistrarVenta} />
              <RutaSegura exact path="/facturas/ver" component={VerFacturas} />
              <RutaSegura
                exact
                path="/Existencias/ingresar"
                component={IngresoExs}
              />
              <Route exact path="/auth/login" component={Login} />
              <RutaSegura
                exact
                path="/Existencias/ver"
                component={VerExistencias}
              />
              <RutaSegura
                exact
                path="/movimientos/ver"
                component={Movimientos}
              />
              <RutaSegura
                exact
                path="/producto/trasladar"
                component={trasladarProducto}
              />
              <RutaSegura
                exact
                path="/proveedor/ingresar"
                component={IngresarProveedor}
              />
              <RutaSegura
                exact
                path="/bodega/ingresar"
                component={IngresarBodega}
              />
              <RutaSegura exact path="/bodega/ver" component={Bodegas} />
              <RutaSegura exact path="/producto/ver" component={Productos} />
              <RutaSegura
                exact
                path="/producto/ingresar"
                component={IngresarProducto}
              />
              <RutaSegura
                exact
                path="/clientes/ingresar"
                component={IngresarCliente}
              />
              <RutaSegura
                exact
                path="/auth/ingresar"
                component={RegistrarUsuario}
              />
            </Switch>
          </Grid>
        </MuiThemeProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
