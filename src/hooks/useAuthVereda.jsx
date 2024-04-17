import React, { useEffect, useState } from "react";
import { consultarVeredas } from "../services/AuthService";

export function useAuthVereda() {
  const [veredas, setVeredas] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const cargarVeredas = async () => {
    try {
      if (!token) {
        alert("Token de autenticación no encontrado en el localStorage");
        setLoading(false);
        throw new Error(
          "Token de autenticación no encontrado en el localStorage"
        );
      } else {
        setLoading(true);
        const data = await consultarVeredas();
        setLoading(false);
        setVeredas(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarVeredas();
  }, []);

  return {
    veredas
  };
}
