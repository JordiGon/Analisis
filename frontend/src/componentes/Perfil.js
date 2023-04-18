import React, { useEffect, useState } from "react";
import axios from "axios";

export const Perfil = (props) => {
  const [paises, obtenerPaises] = useState([]);
  const [status, cambiarstatus] = useState(false);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((resultado) => {
        obtenerPaises(resultado.data);
        cambiarstatus(true);
      })
      .catch((error) => {
        cambiarstatus(true);
      });
  }, []);

  if (status) {
    return (
      <ul>
        {paises.map((pais, indice) => (
          <li key={indice}>{pais.id}</li>
        ))}
      </ul>
    );
  } else {
    return <h1>Estan cargando los valores de la rest</h1>;
  }
};

export default Perfil;
