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
import { withRouter } from "react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import style from "../Tool/Style";

const RegistrarVenta = (props) => {
  const [Valores, setValores] = useState({
    clienteId: 0,
    empleadoId: 0,
    metodoPagoId: 0,
    fechaHora: "",
    nombre: "",
    nit: "",
    total: 0,
  });

  const [Ingresos, setIngresos] = useState([
    {
      productoId: 0,
      cantidad: 0,
      subtotal: 0,
      facturaId: 0,
      precio: 0,
      existencias: 0,
    },
  ]);
  const [Bodegas, setBodega] = useState([]);
  const [Respuesta, setRespuesta] = useState(0);
  const [Productos, setProducto] = useState([]);
  const [Facturas, setFactura] = useState([]);
  const [Existencias, setExistencias] = useState([]);
  const [Clientes, setCliente] = useState([]);
  const [Mpagos, setMpago] = useState([]);
  const Factura = () => {
    axios.get("http://localhost:5000/api/Factura").then((resultado) => {
      setFactura(resultado.data);
    });
  };
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
    Factura();
  }, []);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...Ingresos];
    list[index][name] = value;
    list.map((i) => {
      Productos.map((j) => {
        if (i.productoId === j.productoId) {
          i.precio = j.precio;
        }
      });
    });

    list.map((i) => {
      Existencias.map((j) => {
        if (Valores.empleadoId == j.bodegaId && i.productoId == j.productoId) {
          i.existencias = j.cantidad;
        }
      });
    });

    Valores.total = 0;
    list.map((i) => {
      i.facturaId = Facturas[Facturas.length - 1].facturaId + 1;
      i.subtotal = parseInt(parseInt(i.cantidad) * i.precio);
      Valores.total = Valores.total + i.subtotal;
    });
    console.log(list);
    setIngresos(list);
  };

  // handle add
  const handleAddClick = () => {
    setIngresos([
      ...Ingresos,
      { productoId: 0, cantidad: 0, subtotal: 0, facturaId: 0, precio: 0 },
    ]);
  };
  const handleRemoveClick = (index) => {
    const list = [...Ingresos];
    list.splice(index, 1);
    setIngresos(list);
  };

  const ingresarVal = (e) => {
    const { name, value } = e.target;
    setValores((props) => ({
      ...props,
      [name]: value,
    }));
  };
  const addTransact = (e) => {
    e.preventDefault();
    // clienteId: 0,
    // empleadoId: 0,
    // nombre: "",
    // nit: "",
    // total: 0,
    Valores.clienteId = parseInt(Valores.clienteId);
    Valores.empleadoId = parseInt(Valores.empleadoId);
    Valores.total = parseInt(Valores.total);
    Valores.metodoPagoId = parseInt(Valores.metodoPagoId);
    Valores.total = parseInt(Valores.total);
    Valores.fechaHora = new Date();
    console.log(Valores);
    axios
      .post("http://localhost:5000/api/Factura", Valores)
      .then(function (response) {
        console.log(response);
        Ingresos.map((i, index) => {
          i.cantidad = parseInt(i.cantidad);
          axios
            .post("http://localhost:5000/api/Detalle", i)
            .then(function (response) {
              console.log(response);
              if (index == Ingresos.length - 1) {
                props.history.push("/facturas/ver");
              }
            })
            .catch(function (error) {
              console.log(i);
              alert("Debe llenar todos los campos");
            });
        });
      })
      .catch(function (error) {
        alert("Debe llenar todos los campos");
      });
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
              value={Valores.total}
              disabled
              type="number"
              onChange={ingresarVal}
              fullWidth
              label="Total"
            />
          </Grid>
          {Ingresos.map((x, i) => {
            return (
              <div style={{ display: "flex", flexWrap: "nowrap" }}>
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
                    value={x.productoId}
                    onChange={(e) => handleInputChange(e, i)}
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
                    value={x.cantidad}
                    onChange={(e) => handleInputChange(e, i)}
                    fullWidth
                    inputProps={{
                      min: x.existencias - x.existencias,
                      max: x.existencias,
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
                    name="precio"
                    variant="outlined"
                    value={x.precio}
                    onChange={(e) => handleInputChange(e, i)}
                    disabled
                    fullWidth
                    type="number"
                    label="precio"
                  />
                </Grid>
                <Grid
                  item
                  xs={10}
                  md={10}
                  style={{ marginTop: 10, marginLeft: 10 }}
                >
                  <TextField
                    name="existencias"
                    variant="outlined"
                    defaultValue={0}
                    value={x.existencias}
                    onChange={(e) => handleInputChange(e, i)}
                    fullWidth
                    type="number"
                    label="existencias"
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
                    value={x.subtotal}
                    onChange={(e) => handleInputChange(e, i)}
                    fullWidth
                    disabled
                    type="number"
                    label="Sub total"
                  />
                </Grid>
                {Ingresos.length !== 1 && (
                  <IconButton onClick={() => handleRemoveClick(i)}>
                    <RemoveIcon />
                  </IconButton>
                )}
                {Ingresos.length - 1 === i && (
                  <IconButton onClick={handleAddClick}>
                    <AddIcon />
                  </IconButton>
                )}
              </div>
            );
          })}
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                fullWidth
                onClick={addTransact}
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

export default withRouter(RegistrarVenta);
