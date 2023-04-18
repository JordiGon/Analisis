import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export const MenuIzquierda = ({ classes }) => (
  <div className={classes.list}>
    <List>
      <ListItem component={Link} button to="/auth/perfil">
        <i className="material-icons">account_box</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Perfil"
        />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem component={Link} button to="/Existencias/ver">
        <i className="material-icons">list</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Existencias"
        />
      </ListItem>
      <ListItem component={Link} button to="/producto/ver">
        <i className="material-icons">archive</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Productos"
        />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem component={Link} button to="/Movimientos/ver">
        <i className="material-icons">local_shipping</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Movimientos"
        />
      </ListItem>
      <ListItem component={Link} button to="/producto/trasladar">
        <i className="material-icons">local_shipping</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Traslado de productos"
        />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem component={Link} button to="/bodega/ver">
        <i className="material-icons">fact_check</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Bodegas"
        />
      </ListItem>
      <ListItem component={Link} button to="/proveedor/ver">
        <i className="material-icons">house_siding</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Proveedores"
        />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem component={Link} button to="/clientes/ver">
        <i className="material-icons">emoji_people</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Clientes"
        />
      </ListItem>
      <ListItem component={Link} button to="/ventas/ver">
        <i className="material-icons">sell</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Realizar Ventas"
        />
      </ListItem>
      <ListItem component={Link} button to="/facturas/ver">
        <i className="material-icons">sell</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Ver facturas"
        />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem component={Link} button to="/auth/ingresar">
        <i className="material-icons">person_add</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Nuevo usuario"
        />
      </ListItem>
    </List>
  </div>
);
