import axios from "axios";

const baseUrl = 'https://apptaskmana.onrender.com/api'
const api = {
    call : () => {
        return axios.create({
            baseURL : baseUrl
        })
    }
}

export default api;