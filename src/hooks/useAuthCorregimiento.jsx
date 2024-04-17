import React, { useEffect, useState } from "react";
import { consultarCorregimientos } from "../services/AuthService";

export function useAuthCorregimiento() {
  const [corregimientos, setCorregimientos] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const cargarCorregimientos = async () => {
    try {
      if (!token) {
        alert("Token de autenticación no encontrado en el localStorage");
        setLoading(false);
        throw new Error(
          "Token de autenticación no encontrado en el localStorage"
        );
      } else {
        setLoading(true);
        const data = await consultarCorregimientos();
        setLoading(false);
        setCorregimientos(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarCorregimientos();
  }, []);

  return {
    corregimientos
  };
}
