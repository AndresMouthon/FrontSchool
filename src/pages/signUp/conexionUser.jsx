import axios from "axios";
import Cookies from "js-cookie";

//'https://render-school.onrender.com/api/auth/register'

export default async function registro(firstName, lastName, email, password) {
  try {
            
            const API_URL = 'https://render-school.onrender.com/api/auth/register'; //Obtiene la URL de la Api
            const response = await axios.post(API_URL, {
                firstName,
                lastName,
                email,
                password,
            });
            const token = response.data.token;

            Cookies.set('token', token, {expires: 1});

            console.log('Usuario Conectado', response.data);
            console.log('Token Guardado: ', token);
            // Puedes realizar acciones adicionales con la respuesta del servidor aquí
        } catch (error) {
            console.error('Error en la solicitud:', error);
            // Puedes manejar errores específicos aquí si es necesario
            throw new Error('No se pudo conectar al servidor');
        }
};