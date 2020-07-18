import httpClient from '../base/httpClient';
import {AuthService} from "../auth/AuthService";
import qs from 'querystring';

const prefixLogs = "[ParamedicService]";

const getAll = async () => {
    const endpoint = 'user/paramedic';
    const token = await AuthService.getToken();
    const headers = {Authorization: `bearer ${token}`};

    return await httpClient.get(endpoint, headers)
        .then(response => {
            console.log(`${prefixLogs} [getAll] - Obtuve response => [${qs.stringify(response)}]`)
            return {success: true, data: response.data};
        })
        .catch(error => {
            console.log(`${prefixLogs} [getAll] - Obtuve error => [${qs.stringify(error)}]`)
            if (error.response && error.response.data.error_description === 'Bad credentials') {
                return {success: false, error: '¡Usuario o contraseña incorrecto!'};
            } else {
                return {success: false, error: 'Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.'};
            }
        });
}

export const ParamedicService = {
    getAll,
}
