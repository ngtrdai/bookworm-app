import axios from "axios";

var token = '';
if(JSON.parse(localStorage.getItem('userLogin'))){
    token = localStorage.getItem('token');
}

const axiosClient = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
});

// Interceptors
axiosClient.interceptors.request.use(async (config) => {
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        throw error;
    }
);

export default axiosClient;