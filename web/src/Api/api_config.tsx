import axios from "axios";

export default axios.create({
        baseURL: "http://localhost:2000/api/",
        timeout: 1000, // time request times out
        headers:{'X-Requested-With': 'XMLHttpRequest'},
        responseType: "json",
        withCredentials: true
}); 