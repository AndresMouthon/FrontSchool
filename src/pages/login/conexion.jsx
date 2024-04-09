import axios from "axios";
import Cookies from "js-cookie";
 
export default async function ram(email, password, navigate, setEmail, setPassword) {
    
    try {
        const API_URL = 'https://render-school.onrender.com/api/auth/login';
        const response = await axios.post(API_URL, {
            email,
            password,
        });
        
        const token = response.data.token;
        // Guarda el token en el localStorage
        localStorage.setItem('token', token);
        Cookies.set('token', token, {expires: 1});
        
        console.log('Usuario Conectado', response.data);
        console.log('Token Guardado: ', token);
        
        const respuesta = response.data.data;
        if(respuesta === true){
            navigate('/home');
            console.log('Usuario conectado exitosamente');
        }else{
            alert('Credenciales Incorrectas');
            setEmail('');
            setPassword('');
        }

        return token; // Devuelve el token para que puedas usarlo donde lo necesites
            // Puedes realizar acciones adicionales con la respuesta del servidor aquí
        } catch (error) {
            console.error('Error en la solicitud:', error);
            // Puedes manejar errores específicos aquí si es necesario
            throw new Error('No se pudo conectar al servidor');
        }
};
