import { useEffect, useState } from "react";
import { consultarNivelesEducativos } from "../services/AuthService";
import Swal from "sweetalert2";
import axios from "axios";

export function useAuthNivelEducativo() {
  const [nivelesEducativos, setNivelesEducativos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [nivelEducativo, setNivelEducativo] = useState({
    nombre: "",
    codigo: "",
  });
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem("token");

  const recargar = () => {
    setNivelEducativo({
      nombre: "",
      codigo: "",
    });
    cargarNivelesEducativos();
  };

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const toggleModal = () => {
    recargar();
    setOpenModal(!openModal);
  };

  function handleChange({ target }) {
    setNivelEducativo({
      ...nivelEducativo,
      [target.name]: target.value,
    });
  }

  const capturarInformacion = (card) => {
    toggleModal();
    setNivelEducativo(card);
  };

  const cargarNivelesEducativos = async () => {
    try {
      setLoading(true);
      const data = await consultarNivelesEducativos();
      setLoading(false);
      setNivelesEducativos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (nivelEducativo.nombre === "" || nivelEducativo.codigo === "") {
      Swal.fire({
        icon: "info",
        title: "¡Cuidado!",
        text: "Todos los campos son obligatorios...",
      });
    } else {
      try {
        const response = await axios.post(
          "https://render-school.onrender.com/api/nivel-educativo",
          nivelEducativo,
          { options }
        );
        console.log(response.data);
        if (response.data.message == "Nivel educativo creado con exito") {
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
            text: "Nivel educativo ya existente...",
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

  const eliminarNivelEducativo = async (id) => {
    Swal.fire({
      title: "¿Seguro que desear eliminarlo?",
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
      await axios.delete("https://render-school.onrender.com/api/nivel-educativo/" + id, {
        options,
      });
      Swal.fire({
        icon: "success",
        title: "¡Eliminado!",
        text: "Nivel educativo eliminado...",
        showConfirmButton: false,
        timer: 1000,
      });
      cargarNivelesEducativos();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Error al eliminarlo...",
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

  const actualizar = async () => {
    const nivelActualizar = {
      nombre: nivelEducativo.nombre,
      codigo: nivelEducativo.codigo,
    }
    try {
      const response = await axios.patch(
        "https://render-school.onrender.com/api/nivel-educativo/" + nivelEducativo.id,
        nivelActualizar,
        { options }
      );
      if (response.status == 200) {
        Swal.fire({
          icon: "success",
          title: "¡Actualizado!",
          text: "Actualizacion exitosa...",
          showConfirmButton: false,
          timer: 1000,
        });
        recargar();
        toggleModal();
      }else{
        Swal.fire({
          icon: "warning",
          title: "¡No completado!",
          text: "Nivel educativo ya existente...",
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
    cargarNivelesEducativos();
  }, []);

  return {
    toggleModal,
    handleChange,
    handleSubmit,
    eliminarNivelEducativo,
    capturarInformacion,
    actualizar,
    openModal,
    nivelesEducativos,
    nivelEducativo,
    loading,
  };
}
