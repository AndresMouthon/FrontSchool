import axios from 'axios';

const instance = axios.create({
  axiosURL: 'https://render-school.onrender.com', // Puedes cambiar esto según tu configuración
  timeout: 5000, // Tiempo de espera en milisegundos
  // Más opciones de configuración aquí...
});


export function getApiURL(){
  return instance.defaults.axiosURL;
}

export default instance;
