import axios from "axios";

const baseUrl = 'https://app-task-mana-demo.herokuapp.com/api'
const api = {
    call : () => {
        return axios.create({
            baseURL : baseUrl
        })
    }
}

export default api;