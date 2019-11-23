const host = "https://abstract-inorambuena.herokuapp.com";

const apiEvento = {
    getTipoPartido: `${host}/tipoPartido`,
    getRecintoDeportivo: `${host}/recintoDeportivo`,
    getPartidos: `${host}/listaPartidos`,
    getPartido: `${host}/detallePartido`,
    insertPartido: `${host}/insertarEvento`,
    deletePartido: `${host}/deleteEvento`,
    //Invitados
    getInvitados: `${host}/listadoInvitados`,
    insertInvitado: `${host}/insertarInvitado`,
    deleteInvitado: `${host}/deleteInvitado`,
    confirmarInvitado: `${host}/confirmarInvitado`,
    rechazarInvitado: `${host}/rechazarInvitado`,
};

const uriConfig = {
    apiEvento
};

export default uriConfig;