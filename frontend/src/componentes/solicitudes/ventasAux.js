import {
  Button,
  Container,
  Grid,
  IconButton,
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
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import style from "../Tool/Style";
import DatePicker from "react-datepicker";
import { v4 as uuidv4 } from "uuid";
const Auxiliar = () => {
  const [id, setId] = useState(2);
  const [Aux, setAux] = useState({
    precio: 0,
  });

  const prod = (id) => {
    axios
      .get(`http://localhost:5000/api/Producto/${id}`)
      .then((response) => setAux(response.data.precio));
  };

  prod(id);

  return {
    setId,
    setAux,
    id,
    Aux,
  };
};
const RegistrarVenta = (props) => {
  const [contador, setContador] = useState(0);
  const [Valores, setValores] = useState({
    clienteId: 0,
    empleadoId: 0,
    nombre: "",
    nit: "",
    total: 0,
  });
  const [Ingresos, setIngresos] = useState([
    {
      id: contador,
      productoId: 0,
      cantidad: 0,
      subtotal: 0,
      facturaId: 0,
    },
  ]);
  let salida = [];
  const [atributos, setAtributos] = useState({
    precio: 0,
  });
  const [Bodegas, setBodega] = useState([]);
  const [Productos, setProducto] = useState([]);
  const [Existencias, setExistencias] = useState([]);
  const [Clientes, setCliente] = useState([]);
  const [Mpagos, setMpago] = useState([]);
  const existenciasDb = () => {
    axios.get("http://localhost:5000/api/Existencias").then((resultado) => {
      setExistencias(resultado.data);
    });
  };
  const Bodega = async () => {
    await axios.get("http://localhost:5000/api/Bodega").then((resultado) => {
      setBodega(resultado.data);
    });
  };
  const producto = () => {
    axios.get("http://localhost:5000/api/producto").then((resultado) => {
      setProducto(resultado.data);
    });
  };
  const Cliente = async () => {
    await axios.get("http://localhost:5000/api/Cliente").then((resultado) => {
      setCliente(resultado.data);
    });
  };
  const Mpago = async () => {
    await axios
      .get("http://localhost:5000/api/MetodoPago")
      .then((resultado) => {
        setMpago(resultado.data);
      });
  };
  useEffect(() => {
    Bodega();
    Cliente();
    existenciasDb();
    Mpago();
    producto();
    window["variable" + contador] = Auxiliar();
  }, []);

  const ingresarVals = (e) => {
    const { name, value } = e.target;
    setIngresos((props) => ({
      ...props,
      [name]: value,
    }));
  };
  //let newAtributo =[{}]
  const handleOnChange = (value) => {
    const event = value.target.value;
    setContador(event);
    window["variable" + event].setId(event);
    console.log(window["variable" + event].Aux);
  };
  const handleChangeInput = (id, event) => {
    console.log(id);
    const newInputFields = Ingresos.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    console.log(Ingresos);
    // console.log(newInputFields);
    //const newAtributos = new
    //console.log(newInputFields);
    setIngresos(newInputFields);

    // const newAtributos = Ingresos.map((j) => {
    //   Productos.map((i) => {
    //     if (j.productoId == i.productoId) {
    //       console.log(j);
    //       return i;
    //     }
    //   });
    // });
    // setAtributos({
    //   ...atributos,
    //   newAtributos,
    // });
    // cantidadAux = Existencia.filter(function (elemento) {
    //     return (
    //       elemento.bodegaId == Movimiento.bodegaId &&
    //       elemento.productoId == Movimiento.productoId
    //     );
    //   });
    //   if (typeof cantidadAux[0] != "undefined") {
    //     getCantidad(cantidadAux[0].cantidad);
    //   }
  };

  const handleAddFields = () => {
    setIngresos([
      ...Ingresos,
      { productoId: 0, cantidad: 0, subtotal: 0, facturaId: 0 },
    ]);
    setContador(1 + contador);
    console.log(contador);
  };

  const handleRemoveFields = (id) => {
    const values = [...Ingresos];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setContador(contador - 1);
    setIngresos(values);
  };

  const ingresarVal = (e) => {
    const { name, value } = e.target;
    setValores((props) => ({
      ...props,
      [name]: value,
    }));
  };
  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Registro de nueva venta
        </Typography>
      </div>
      <form style={style.form}>
        <Grid container spacing={2}>
          <Grid container alignItems="center" justifyContent="space-around">
            <InputLabel> Seleccione cliente</InputLabel>

            <Select
              name="clienteId"
              variant="outlined"
              onChange={ingresarVal}
              style={style.select}
              required
            >
              {Clientes.map((i) => (
                <MenuItem value={i.clienteId}>
                  {i.nombre + " " + i.apellido}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-around">
            <InputLabel> Seleccione su metodo de pago</InputLabel>

            <Select
              name="metodoPagoId"
              variant="outlined"
              onChange={ingresarVal}
              style={style.select}
              required
            >
              {Mpagos.map((i) => (
                <MenuItem value={i.metodoPagoId}>{i.nombre}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-around">
            <InputLabel> Seleccione lugar de compra</InputLabel>

            <Select
              name="empleadoId"
              variant="outlined"
              onChange={ingresarVal}
              style={style.select}
              required
            >
              {Bodegas.map((i) => (
                <MenuItem value={i.bodegaId}>{i.nombre}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="nit"
              variant="outlined"
              onChange={ingresarVal}
              fullWidth
              label="Ingrese nit"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="nombre"
              variant="outlined"
              onChange={ingresarVal}
              fullWidth
              label="Ingrese nombre facturacion"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="total"
              variant="outlined"
              onChange={ingresarVal}
              fullWidth
              label="Ingrese nombre facturacion"
            />
          </Grid>
          {Ingresos.map((ingreso, index) => (
            <div key={index.id} style={{ display: "flex", flexWrap: "nowrap" }}>
              <Grid
                item
                xs={10}
                md={10}
                style={{ marginTop: 10, marginLeft: 10 }}
              >
                <TextField
                  name="productoId"
                  variant="outlined"
                  label="Seleccione Producto"
                  onChange={handleOnChange}
                  select
                  fullWidth
                >
                  {Productos.map((i) => (
                    <MenuItem key={i.productoId} value={i.productoId}>
                      {i.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid
                item
                xs={10}
                md={10}
                style={{ marginTop: 10, marginLeft: 10 }}
              >
                <TextField
                  name="cantidad"
                  variant="outlined"
                  onChange={(event) => handleChangeInput(ingreso.id, event)}
                  fullWidth
                  inputProps={{
                    min: 1,
                    max: 20,
                    step: 1,
                    onKeyDown: (event) => {
                      event.preventDefault();
                    },
                  }}
                  type="number"
                  label="Ingrese cantidad"
                />
              </Grid>
              <Grid
                item
                xs={10}
                md={10}
                style={{ marginTop: 10, marginLeft: 10 }}
              >
                <TextField
                  name="subtotal"
                  variant="outlined"
                  onChange={(event) => handleChangeInput(ingreso.id, event)}
                  fullWidth
                  disabled
                  type="number"
                  label="Sub total"
                />
              </Grid>
              <IconButton
                disabled={Ingresos.length === 1}
                onClick={() => handleRemoveFields(Ingresos.id)}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton onClick={handleAddFields}>
                <AddIcon />
              </IconButton>
            </div>
          ))}

          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
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
        </Grid>
      </form>
    </Container>
  );
};

export default RegistrarVenta;
