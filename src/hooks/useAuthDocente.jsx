import React, { useEffect, useState } from "react";
import { consultarDocentes } from "../services/AuthService";
import { useAuthPersona } from "./useAuthPersona";
import Swal from "sweetalert2";
import axios from "axios";

export function useAuthDocente() {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [busquedaDocente, setBusquedaDocente] = useState("");
  const [persona, setPersona] = useState({});
  const [estadoBusqueda, setEstadoBusqueda] = useState("");

  const { personas } = useAuthPersona();

  const handleChangeBusqueda = ({ target }) => {
    setBusquedaDocente(target.value);
  };

  const cargarDocentes = async () => {
    try {
      if (!token) {
        alert("Token de autenticación no encontrado en el localStorage");
        setLoading(false);
        throw new Error(
          "Token de autenticación no encontrado en el localStorage"
        );
      } else {
        setLoading(true);
        const data = await consultarDocentes();
        setLoading(false);
        setDocentes(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buscarPersona = () => {
    const persona = personas.filter(
      (persona) => persona.identificacion === busquedaDocente
    );
    if (persona.length > 0) {
      setPersona(persona[0]);
      setBusquedaDocente("");
      setEstadoBusqueda("Con persona");
    } else {
      setEstadoBusqueda("Sin persona");
    }
  };
  const registrarDocente = async (id, idCategoria) => {
    if (id === "" || idCategoria === "") {
      Swal.fire({
        icon: "info",
        title: "¡Cuidado!",
        text: "Todos los campos son obligatorios...",
      });
    } else {
      try {
        const docente = {
          persona: id,
          categoriaFuncionario: idCategoria,
        };
        const data = await axios.post(
          "https://render-school.onrender.com/api/docente",
          docente,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.data.message == "Docente creado correctamente") {
          Swal.fire({
            icon: "success",
            title: "¡Registrado como docente!",
            text: "Registro exitoso...",
            showConfirmButton: false,
            timer: 2000,
          });
          setBusquedaDocente("")
          setEstadoBusqueda("Persona registrada")
          cargarDocentes();
        } else {
          Swal.fire({
            icon: "warning",
            title: "¡No completado!",
            text: "Ya existe una persona con estos datos...",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {}
    }
  };

  const eliminarDocente = async (id) => {
    Swal.fire({
      title: "¿Seguro que desea eliminarla?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Confirmar!",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminacionConfirmada(id);
      }
    });
  };

  async function eliminacionConfirmada(id) {
    try {
      await axios.delete(
        "https://render-school.onrender.com/api/docente/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "¡Eliminado!",
        text: "Docente eliminada...",
        showConfirmButton: false,
        timer: 2000,
      });
      cargarDocentes();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Error al eliminarlo...",
        showConfirmButton: false,
        timer: 2000,
      });
      if (error.response) {
      } else if (error.request) {
        console.error("No se recibio respuesta del servidor");
      } else {
        console.log("Error al eliminar al usuario");
      }
    }
  }

  useEffect(() => {
    cargarDocentes();
  }, []);

  return {
    docentes,
    loading,
    busquedaDocente,
    persona,
    estadoBusqueda,
    handleChangeBusqueda,
    buscarPersona,
    registrarDocente,
    eliminarDocente,
  };
}
