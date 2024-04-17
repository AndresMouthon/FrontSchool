import React, { useEffect, useState } from "react";
import { consultarBarrios } from "../services/AuthService";

export function useAuthBarrio() {
  const [barrios, setBarrios] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const cargarBarrios = async () => {
    try {
      if (!token) {
        alert("Token de autenticación no encontrado en el localStorage");
        setLoading(false);
        throw new Error(
          "Token de autenticación no encontrado en el localStorage"
        );
      } else {
        setLoading(true);
        const data = await consultarBarrios();
        setLoading(false);
        setBarrios(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarBarrios();
  }, []);

  return {
    barrios,
  };
}
