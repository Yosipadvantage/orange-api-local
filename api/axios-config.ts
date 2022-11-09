import { AxiosRequestConfig } from "axios";

const baseUrl = process.env.NEXT_PUBLIC_TOKEN;

export const axiosRequestConfiguration: AxiosRequestConfig = {
    baseURL: baseUrl,
    headers: {
        'Content-type': 'application/x-www-form-urlencoded',
    }
};
