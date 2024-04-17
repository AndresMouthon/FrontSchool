import React, { useEffect, useState } from "react";
import { consultarComunas } from "../services/AuthService";

export function useAuthComuna() {
  const [comunas, setComunas] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const cargarComunas = async () => {
    try {
      if (!token) {
        alert("Token de autenticación no encontrado en el localStorage");
        setLoading(false);
        throw new Error(
          "Token de autenticación no encontrado en el localStorage"
        );
      } else {
        setLoading(true);
        const data = await consultarComunas();
        setLoading(false);
        setComunas(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarComunas();
  }, []);

  return {
    comunas,
  };
}
