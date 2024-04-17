import React, { useEffect, useState } from "react";
import { consultarCiudades } from "../services/AuthService";

export function useAuthCiudad() {
  const [ciudades, setCiudades] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const cargarCiudades = async () => {
    try {
      if (!token) {
        alert("Token de autenticación no encontrado en el localStorage");
        setLoading(false);
        throw new Error(
          "Token de autenticación no encontrado en el localStorage"
        );
      } else {
        setLoading(true);
        const data = await consultarCiudades();
        setLoading(false);
        setCiudades(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarCiudades();
  }, []);

  return {
    ciudades,
  };
}
