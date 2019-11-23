const host = "https://abstract-inorambuena.herokuapp.com";

const apiEvento = {
    //Partido
    getTipoPartido: `${host}/partido/tipo-partido`,
    getRecintoDeportivo: `${host}/partido/recinto-deportivo`,
    getPartidos: `${host}/partido/listado`,
    getPartido: `${host}/partido/detalle`,
    insertPartido: `${host}/partido/insertar`,
    deletePartido: `${host}/partido/eliminar`,
    //Invitado
    getInvitados: `${host}/invitado/listado`,
    insertInvitado: `${host}/invitado/insertar`,
    deleteInvitado: `${host}/invitado/eliminar`,
    confirmarInvitado: `${host}/invitado/confirmar`,
    rechazarInvitado: `${host}/invitado/rechazar`,
};

const uriConfig = {
    apiEvento
};

export default uriConfig;