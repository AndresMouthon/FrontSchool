import React, { useEffect, useState } from "react";
import { consultarPersonas } from "../services/AuthService";
import Swal from "sweetalert2";
import axios from "axios";

export function useAuthPersona() {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [persona, setPersona] = useState({
    nombre: "",
    apellido: "",
    tipoIdentificacion: "",
    identificacion: "",
    fechaNacimiento: "",
    genero: "",
    email: "",
    telefono: "",
    departamento: "",
    ciudad: "",
    corregimiento: "",
    barrio: "",
    vereda: "",
    comuna: "",
  });

  const token = localStorage.getItem("token");

  const recargar = () => {
    setPersona({
      nombre: "",
      apellido: "",
      tipoIdentificacion: "",
      identificacion: "",
      fechaNacimiento: "",
      genero: "",
      email: "",
      telefono: "",
      departamento: "",
      ciudad: "",
      corregimiento: "",
      barrio: "",
      vereda: "",
      comuna: "",
    });
    cargarPersonas();
  };

  const cargarPersonas = async () => {
    try {
      if (!token) {
        alert("Token de autenticación no encontrado en el localStorage");
        setLoading(false);
        throw new Error(
          "Token de autenticación no encontrado en el localStorage"
        );
      } else {
        setLoading(true);
        const data = await consultarPersonas();
        setLoading(false);
        setPersonas(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarPersona = async (id) => {
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
        "https://render-school.onrender.com/api/persona/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "¡Eliminada!",
        text: "Persona eliminada...",
        showConfirmButton: false,
        timer: 1000,
      });
      cargarPersonas();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Error al eliminarla...",
        showConfirmButton: false,
        timer: 1000,
      });
      if (error.response) {
      } else if (error.request) {
        console.error("No se recibio respuesta del servidor");
      } else {
        console.log("Error al eliminar al usuario");
      }
    }
  }

  const toggleModal = () => {
    recargar();
    setOpenModal(!openModal);
  };

  const handleChange = ({ target }) => {
    setPersona({
      ...persona,
      [target.name]: target.value,
    });
  };

  const registrarPersona = async () => {
    if (
      persona.nombre === "" ||
      persona.apellido === "" ||
      persona.departamento === "" ||
      persona.ciudad === "" ||
      persona.tipoIdentificacion === "" ||
      persona.telefono === "" ||
      persona.identificacion === "" ||
      persona.fechaNacimiento === "" ||
      persona.email === "" ||
      persona.genero === ""
    ) {
      Swal.fire({
        icon: "info",
        title: "¡Cuidado!",
        text: "Todos los campos son obligatorios...",
      });
    }
    else {
      const nuevosDatos = { ...persona };
      if (persona.barrio === "") {
        delete nuevosDatos.barrio;
      }
      if (persona.corregimiento === "") {
        delete nuevosDatos.corregimiento;
      }
      if (persona.comuna === "") {
        delete nuevosDatos.comuna;
      }
      if (persona.vereda === "") {
        delete nuevosDatos.vereda;
      }
      try {
        const data = await axios.post(
          "https://render-school.onrender.com/api/persona",
          nuevosDatos,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.data.message == "Persona creada correctamente") {
          Swal.fire({
            icon: "success",
            title: "¡Registrado!",
            text: "Registro exitoso...",
            showConfirmButton: false,
            timer: 1000,
          });
          recargar();
          toggleModal();
        } else {
          Swal.fire({
            icon: "warning",
            title: "¡No completado!",
            text: "Ya existe una persona con estos datos...",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Error al registrar...",
          showConfirmButton: false,
          timer: 1000,
        });
        if (error.response) {
        } else if (error.request) {
          console.error("No se recibio respuesta del servidor");
        } else {
          console.log("Error al registrar al usuario");
        }
      }
    }
  };

  const capturarInformacion = (persona) => {
    toggleModal();
    setPersona(persona);
  };

  const actualizarPersona = async () => {
    const personaActualizar = {
      nombre: persona.nombre,
      apellido: persona.apellido,
      tipoIdentificacion: persona.tipoIdentificacion,
      identificacion: persona.identificacion,
      genero: persona.genero,
      fechaNacimiento: persona.fechaNacimiento,
      email: persona.email,
      telefono: persona.telefono,
    };
    try {
      const data = await axios.patch(
        "https://render-school.onrender.com/api/persona/" + persona.id,
        personaActualizar,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status == 200) {
        Swal.fire({
          icon: "success",
          title: "¡Actualizada!",
          text: "Actualizacion exitosa...",
          showConfirmButton: false,
          timer: 1000,
        });
        recargar();
        toggleModal();
      } else {
        Swal.fire({
          icon: "warning",
          title: "¡No completado!",
          text: "Error al actualizar...",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Error al Actualizar...",
        showConfirmButton: false,
        timer: 1000,
      });
      if (error.response) {
      } else if (error.request) {
        console.error("No se recibio respuesta del servidor");
      } else {
        console.log("Error al registrar al usuario");
      }
    }
  };

  useEffect(() => {
    cargarPersonas();
  }, []);

  return {
    eliminarPersona,
    toggleModal,
    handleChange,
    registrarPersona,
    capturarInformacion,
    actualizarPersona,
    personas,
    loading,
    openModal,
    persona,
  };
}
