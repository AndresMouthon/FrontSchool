import React, { useEffect, useState } from "react";
import { consultarDepartamentos } from "../services/AuthService";

export function useAuthDepartamento() {
  const [departamentos, setDepartamentos] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const cargarDepartamentos = async () => {
    try {
      if (!token) {
        alert("Token de autenticación no encontrado en el localStorage");
        setLoading(false);
        throw new Error(
          "Token de autenticación no encontrado en el localStorage"
        );
      } else {
        setLoading(true);
        const data = await consultarDepartamentos();
        setLoading(false);
        setDepartamentos(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarDepartamentos();
  }, []);

  return {
    departamentos
  };
}
