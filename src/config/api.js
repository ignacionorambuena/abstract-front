const host = "https://abstract-inorambuena.herokuapp.com";

const apiEvento = {
    getTipoPartido: `${host}/tipoPartido`,
    getRecintoDeportivo: `${host}/recintoDeportivo`,
    getPartidos: `${host}/listaPartidos`,
    getPartido: `${host}/detallePartido`,
    insertPartido: `${host}/insertarEvento`,
    deletePartido: `${host}/deleteEvento`,
};

const uriConfig = {
    apiEvento
};

export default uriConfig;