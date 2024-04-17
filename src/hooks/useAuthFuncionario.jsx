import React, { useEffect, useState } from "react";
import { consultarFuncionario } from "../services/AuthService";

export function useAuthFuncionario() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const cargarFuncionarios = async () => {
    try {
      if (!token) {
        alert("Token de autenticación no encontrado en el localStorage");
        setLoading(false);
        throw new Error(
          "Token de autenticación no encontrado en el localStorage"
        );
      } else {
        setLoading(true);
        const data = await consultarFuncionario();
        setLoading(false);
        setFuncionarios(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarFuncionarios();
  }, []);

  return {
    funcionarios,
  };
}
