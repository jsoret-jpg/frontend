// Importa tu instancia personalizada (ajusta la ruta según la ubicación de tu archivo)
import api from '../services/api'; 

const handleLogin = async (e) => {
  e.preventDefault();
  
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  // Usa "api.post" para que respete https://contratos-gestion.onrender.com
  const response = await api.post('/api/auth/login', formData);
};

export default api;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
