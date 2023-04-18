import { Avatar, List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import FotoUsuarioTemp from "../../../logo.svg";
import { Link } from "react-router-dom";

export const MenuDerecha = ({ classes, usuario, salirSesion }) => (
  <div className={classes.list}>
    <List>
      <ListItem button component={Link} button to="/auth/perfil">
        <Avatar src={usuario.foto || FotoUsuarioTemp} />
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary={usuario ? usuario.nombreCompleto : ""}
        />
      </ListItem>
      <ListItem button onClick={salirSesion}>
        <i className="material-icons">logout</i>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="salir"
        />
      </ListItem>
    </List>
  </div>
);
