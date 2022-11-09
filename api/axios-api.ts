import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { axiosRequestConfiguration } from './axios-config';
import initializeAxios from './axios-instance'


const axiosInstance = initializeAxios(axiosRequestConfiguration);

const get = <T>(url: string, queryParams?: object): Observable<T> => {
    return defer(() => axiosInstance.get<T>(url, { params: queryParams }))
        .pipe(map((result: any) => result.data));
};

const post = <T>(url: string, body: any, queryParams?: object): Observable<T | void> => {
    return defer(() => axiosInstance.post<T>(url, body, { params: queryParams }))
        .pipe(map((result: any) => result ? result.data : ''));
};

const put = <T>(url: string, body: any, queryParams?: object): Observable<T | void> => {
    return defer(() => axiosInstance.put<T>(url, body, { params: queryParams }))
        .pipe(map((result: any) => result.data));
};

const patch = <T>(url: string, body: any, queryParams?: object): Observable<T | void> => {
    return defer(() => axiosInstance.patch<T>(url, body, { params: queryParams }))
        .pipe(map((result: any) => result.data));
};

const deleteR = <T>(url: string, id: number): Observable<T | void> => {
    return defer(() => (axiosInstance.delete(`${url}/${id}`)))
        .pipe(map((result: any) => result.data)
        );
};


export default { get, post, put, patch, delete: deleteR };