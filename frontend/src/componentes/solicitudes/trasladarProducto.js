import {
  Button,
  Container,
  Dialog,
  DialogContentText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../../contexto/store";
import { withRouter } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { registrarClientebd } from "../../actions/UsuarioAction";
import style from "../Tool/Style";
import DatePicker from "react-datepicker";

const TrasladarProd = (props) => {
  const [Producto, getProductos] = useState([]);
  const [BodegaO, getBodegaOs] = useState([]);
  const [Existencia, getExistencias] = useState([]);
  const [otroaux, getCantidad] = useState(0);
  let cantidadAux = [];
  const [Movimiento, setMovimiento] = useState({
    cantidad: 0,
    bodegaId: 0,
    productoId: 0,
    tipoMovimientoId: 3,
    bodegaId2: "",
  });
  cantidadAux = Movimiento;
  const ingresarVal = (e) => {
    const { name, value } = e.target;
    setMovimiento((props) => ({
      ...props,
      [name]: value,
    }));
    console.log(Movimiento);
    cantidadAux = Existencia.filter(function (elemento) {
      return (
        elemento.bodegaId == Movimiento.bodegaId &&
        elemento.productoId == Movimiento.productoId
      );
    });
    if (typeof cantidadAux[0] != "undefined") {
      getCantidad(cantidadAux[0].cantidad);
    }
  };
  const existenciasDb = () => {
    axios.get("http://localhost:5000/api/Existencias").then((resultado) => {
      getExistencias(resultado.data);
      console.log(resultado.data);
    });
  };
  const producto = () => {
    axios.get("http://localhost:5000/api/producto").then((resultado) => {
      getProductos(resultado.data);
      console.log(resultado.data);
    });
  };
  useEffect(() => {
    axios.get("http://localhost:5000/api/Bodega").then((resultado) => {
      getBodegaOs(resultado.data);
    });
    producto();
    existenciasDb();
  }, []);

  const addMovimiento = (e) => {
    e.preventDefault();
    Movimiento.cantidad = parseInt(Movimiento.cantidad);
    axios
      .post("http://localhost:5000/api/Movimientos", Movimiento)
      .then(function (response) {
        console.log(response);
        props.history.push("/Existencias/ver");
      })
      .catch(function (error) {
        alert("Debe llenar todos los campos");
      });
  };

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Registre su informacion de traslado
        </Typography>
      </div>
      <form style={style.form}>
        <Grid container spacing={2}>
          <Grid container alignItems="center" justifyContent="space-around">
            <InputLabel> Seleccione una bodedega de origen </InputLabel>

            <Select
              name="bodegaId"
              variant="outlined"
              onChange={ingresarVal}
              style={style.select}
              required
            >
              {BodegaO.map((cat) =>
                cat.bodegaId != 0 ? (
                  <MenuItem value={cat.bodegaId}>{cat.nombre}</MenuItem>
                ) : (
                  console.log("bodega no disponible")
                )
              )}
            </Select>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-around">
            <InputLabel> Seleccione una producto </InputLabel>

            <Select
              name="productoId"
              variant="outlined"
              onChange={ingresarVal}
              style={style.select}
              required
            >
              {Producto.map((cat) => (
                <MenuItem value={cat.productoId}>{cat.nombre}</MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid container alignItems="center" justifyContent="space-around">
            <InputLabel> Seleccione una bodedega de destino </InputLabel>

            <Select
              name="bodegaId2"
              variant="outlined"
              onChange={ingresarVal}
              style={style.select}
              required
            >
              {BodegaO.map((cat) =>
                Existencia.map((ind) =>
                  cat.bodegaId != 0 &&
                  Movimiento.bodegaId != cat.bodegaId &&
                  ind.cantidad != 0 &&
                  ind.productoId == Movimiento.productoId &&
                  ind.bodegaId == Movimiento.bodegaId ? (
                    <MenuItem value={cat.bodegaId}>{cat.nombre}</MenuItem>
                  ) : (
                    console.log("buscando bodegas")
                  )
                )
              )}
            </Select>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="cantidad"
              variant="outlined"
              value={Movimiento.cantidad}
              onChange={ingresarVal}
              fullWidth
              inputProps={{
                min: 0,
                max: otroaux,
                step: 1,
                onKeyDown: (event) => {
                  event.preventDefault();
                },
              }}
              type="number"
              label="Ingrese cantidad"
            />
          </Grid>

          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={addMovimiento}
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

export default withRouter(TrasladarProd);
