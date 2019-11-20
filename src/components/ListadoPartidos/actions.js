import apiConfig from "../../config/api";
import axios from 'axios';

export const cargaTipoPartido = (datos) => ({
    type: "CARGA_TIPO_PARTIDOS",
    datos,
});

/**
 * Action encargado de obtener la información de un cliente por su rut
 * @method getHistorial
 * @param {string} rut : Rut del cliente. Ej: 176594098
 * @returns {dispatch} : Evento a despachar  ya sea por concepto de éxito o fracaso.
 */
export const getTipoPartido = () => async(dispatch) => {
    try {
        const endPoint = `${apiConfig.apiEvento.getTipoPartido}`;

        axios.get(`${endPoint}`)
            .then(res => {
                if (res.length > 0) {
                    dispatch(cargaTipoPartido(res.data));
                } else {
                    dispatch(cargaTipoPartido([]));
                }
            })
    } catch (err) {
        // trace.error("CARGA_TIPO_PARTIDOS_ERR", err);
        console.log(err);
    }
};