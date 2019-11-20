import tipoPartidoState from "./state";

const tipoPartidoReducer = (state = tipoPartidoState, action) => {
    switch (action.type) {
        // Reducers should always return a default initial state.
        case "CARGA_TIPO_PARTIDOS":
            {
                const listado = {...action.datos };
                return Object.assign({}, state, {
                    listado,
                });
            }
        case "CARGA_TIPO_PARTIDOS_ERR":
            {
                return Object.assign({}, state, {
                    loadingHistorial: false,
                });
            }
        default:
            return state;
    }
};

export default tipoPartidoReducer;