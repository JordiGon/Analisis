import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import axios from "axios";
import style from "../Tool/Style";
import { Container, Typography } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    alignItems: "center",
    width: "50%",
    overflowX: "auto",
  },
  table: {
    alignItems: "center",
    minWidth: 650,
  },
});

function createData(facturaId, nombre, nit, total, aux) {
  return { facturaId, nombre, nit, total, aux };
}

const rows = [
  createData(
    "Frozen yoghurt",
    159,
    6.0,
    24,
    4.0,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  ),
  createData(
    "Ice cream sandwich",
    237,
    9.0,
    37,
    4.3,
    "Maecenas rutrum urna vel lacus viverra, id ultrices dui rutrum"
  ),
  createData(
    "Eclair",
    262,
    16.0,
    24,
    6.0,
    "Morbi congue gravida nunc, eu cursus felis vulputate id"
  ),
  createData(
    "Cupcake",
    305,
    3.7,
    67,
    4.3,
    "Vestibulum efficitur, ipsum consectetur finibus maximus, ligula dolor vehicula ex, sed viverra nulla mauris id purus"
  ),
  createData(
    "Gingerbread",
    356,
    16.0,
    49,
    3.9,
    " Suspendisse vehicula eu libero eget viverra"
  ),
];
const espacio = "   ";
const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded &&
        expandComponent.map((i) => (
          <TableRow>
            <TableCell />
            <TableCell colSpan="5">
              {/* {`Producto:    ${i.producto}        Cantidad:    ${i.cantidad}        Subtotal:    Q.${i.subtotal}.00`} */}
              <p>
                <span style={{ marginLeft: 15 }}>Producto:</span>
                <span style={{ marginLeft: 15 }}>{i.producto}</span>
                <span style={{ marginLeft: 100 }}>Cantidad:</span>
                <span style={{ marginLeft: 15 }}>{i.cantidad}</span>
                <span style={{ marginLeft: 100 }}>SubTotal:</span>
                <span style={{ marginLeft: 15 }}>{i.subtotal}</span>
              </p>
            </TableCell>
          </TableRow>
        ))}
    </>
  );
};

export default function SimpleTable() {
  const [rows, setFactura] = useState([]);
  const [detalle, setdetalle] = useState([]);
  const [Productos, getProductos] = useState([]);
  const producto = async () => {
    await axios.get("http://localhost:5000/api/producto").then((resultado) => {
      getProductos(resultado.data);
    });
  };
  const Factura = () => {
    axios.get("http://localhost:5000/api/Factura").then((resultado) => {
      setFactura(resultado.data);
    });
  };
  const detail = () => {
    axios.get("http://localhost:5000/api/Detalle").then((resultado) => {
      setdetalle(resultado.data);
    });
  };
  useEffect(() => {
    Factura();
    producto();
    detail();
  }, []);

  detalle.map((i) => {
    Productos.map((j) => {
      if (i.productoId == j.productoId) {
        i.producto = j.nombre;
      }
    });
  });
  rows.map((i, index) => {
    const elemento = [];
    detalle.map((j) => {
      if (parseInt(i.facturaId) == parseInt(j.facturaId)) {
        elemento.push(j);
      }
    });
    i.cliente = elemento;
  });
  console.log(rows);
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Registro de facturacion
        </Typography>
      </div>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell align="center">Factura Id</TableCell>
            <TableCell align="center">Nit</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map(row => (
            <React.Fragment key={row.name}>
              <TableRow>
                <TableCell padding="checkbox">
                  <IconButton>
                    <KeyboardArrowDownIcon />
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            </React.Fragment>
          ))} */}
          {rows.map((row) => (
            <ExpandableTableRow expandComponent={row.cliente}>
              <TableCell align="center" component="th" scope="row">
                {row.facturaId}
              </TableCell>
              <TableCell align="center">{row.nombre}</TableCell>
              <TableCell align="center">{row.nit}</TableCell>
              <TableCell align="center">{"Q." + row.total + ".00"}</TableCell>
            </ExpandableTableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
