// src/axiosConfig.js

import axios from 'axios';

// Obtém o token CSRF da meta tag
const metaTag = document.querySelector('meta[name="csrf-token"]');
const csrfToken = metaTag ? metaTag.getAttribute('content') : '';

console.log('CSRF Token:', csrfToken); // Verifique se o token está sendo corretamente recuperado

// Configura o axios para enviar o token CSRF em todas as solicitações
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

// Configura o endpoint base para suas solicitações (opcional)
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

// Exporta a instância configurada do axios
export default axios;
