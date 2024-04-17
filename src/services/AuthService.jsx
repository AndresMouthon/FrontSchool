import axios from "axios";

const token = localStorage.getItem("token");

const options = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const consultarNivelesEducativos = async () => {
  const data = await axios.get(
    "https://render-school.onrender.com/api/nivel-educativo",
    { options }
  );
  return data.data;
};
export const consultarPersonas = async () => {
  const data = await axios.get(
    "https://render-school.onrender.com/api/persona",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};
export const consultarDepartamentos = async () => {
  const data = await axios.get(
    "https://render-school.onrender.com/api/departamento",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};
export const consultarCiudades = async () => {
  const data = await axios.get(
    "https://render-school.onrender.com/api/ciudad",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};
export const consultarCorregimientos = async () => {
  const data = await axios.get(
    "https://render-school.onrender.com/api/corregimiento",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};
export const consultarBarrios = async () => {
  const data = await axios.get(
    "https://render-school.onrender.com/api/barrio",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};
export const consultarVeredas = async () => {
  const data = await axios.get(
    "https://render-school.onrender.com/api/vereda",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};
export const consultarComunas = async () => {
  const data = await axios.get(
    "https://render-school.onrender.com/api/comuna",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};
export const consultarDocentes = async () => {
  const data = await axios.get(
    "https://render-school.onrender.com/api/docente",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};
export const consultarFuncionario = async () => {
  const data = await axios.get(
    "https://render-school.onrender.com/api/categoria-funcionario",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};
// export const registrarPersona = async (persona) => {
//   const data = await axios.post(
//     "https://render-school.onrender.com/api/persona",
//     persona,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return data;
// }
