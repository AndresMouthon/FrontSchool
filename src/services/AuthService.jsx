import axios from "axios";

const token = localStorage.getItem("token");

const options = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
};

export const consultarNivelesEducativos = async () => {
  const data = await axios.get("https://render-school.onrender.com/api/nivel-educativo", {options});
  return data.data;
};
// export const registrarNiveleEducativo = async (nivelEducativo) => {
//   try {
//     const response = await axios.post(APISNIVELEDUCATIVO.REGISTRARNIVELEDUCATIVO, nivelEducativo, {options});
//     return response.data;
//   } catch (error) {
//     return "null";
//   }
// };