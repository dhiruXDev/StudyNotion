
import axios from "axios"
// here fetch and axios are same
export const axiosInstance = axios.create({
    withCredentials: true // Ensure credentials are included if needed
});
export const apiConnector = (method, url, bodyData, headers, params)=>{
     return axiosInstance({
        method :  `${method}`,
        url : `${url}` ,
        data : bodyData ? bodyData : null,
        headers : headers ? headers : null,
        params : params ? params : null
     })
}