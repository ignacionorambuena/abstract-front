const partidoReducer = (state = [], action) => {
    switch (action.type) {
        case 'CREAR_EVENTO':
            debugger;
            return state.concat([action.data]);
        case 'ELIMINAR_EVENTO':
            return state.filter((evento) => evento.id !== action.id);
        default:
            return state;
    }
}
export default partidoReducer;