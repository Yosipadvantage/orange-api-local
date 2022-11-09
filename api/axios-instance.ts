import axios, { AxiosInstance, AxiosRequestConfig } from "axios";


const initialization = (config: AxiosRequestConfig): AxiosInstance => {

    /* Add default headers, interceptors etc.. */

    const axiosInstance = axios.create(config);
    axiosInstance.interceptors.request.use(
        (request: any) => {

            /* Manipule la PETICIÓN al API */
            console.log(request);
            return request;

        }
    );

    axiosInstance.interceptors.response.use(
        (response: any) => {

            /* Manipule la RESPUESTA al API */
            console.log(response);
            return response;
        },
        (error: any) => {

            /* Manipule los ERRORES del servidor  */
            console.log(error);
            return error.response;
        }
    );

    return axiosInstance;
};

export default initialization;
