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
const IngresarProducto = (props) => {
  const [Producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    descuento: 0,
    categoriaId: 0,
  });
  const [categoria, getcategorias] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/Categoria").then((resultado) => {
      getcategorias(resultado.data);
    });
  }, []);

  const ingresarVal = (e) => {
    const { name, value } = e.target;
    setProducto((props) => ({
      ...props,
      [name]: value,
    }));
  };

  const addProducto = (e) => {
    e.preventDefault();
    Producto.precio = Number(Producto.precio);
    Producto.descuento = Number(Producto.descuento);
    console.log(Producto);
    axios
      .post("http://localhost:5000/api/Producto", Producto)
      .then(function (response) {
        console.log(response);

        props.history.push("/producto/ver");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Ingresar Producto
        </Typography>
      </div>
      <form style={style.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              name="nombre"
              variant="outlined"
              value={Producto.nombre}
              onChange={ingresarVal}
              fullWidth
              label="Ingrese nombre del pruducto"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="descripcion"
              variant="outlined"
              value={Producto.descripcion}
              required
              onChange={ingresarVal}
              fullWidth
              label="Ingrese una descripcion"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="precio"
              variant="outlined"
              value={Producto.precio}
              onChange={ingresarVal}
              fullWidth
              type="number"
              label="Ingrese precio"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="descuento"
              variant="outlined"
              value={Producto.descuento}
              onChange={ingresarVal}
              fullWidth
              type="number"
              label="Ingrese descuento"
            />
          </Grid>
          <Grid container alignItems="center" justifyContent="space-around">
            <InputLabel> Seleccione una categoria </InputLabel>

            <Select
              name="categoriaId"
              onChange={ingresarVal}
              style={style.select}
              required
            >
              {categoria.map((cat) => (
                <MenuItem value={cat.categoriaId}>
                  {cat.nombreCategoria}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={addProducto}
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

export default withRouter(IngresarProducto);
