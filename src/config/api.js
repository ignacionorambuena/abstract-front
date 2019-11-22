const host = "https://abstract-inorambuena.herokuapp.com";

const apiEvento = {
    getTipoPartido: `${host}/tipoPartido`,
    getRecintoDeportivo: `${host}/recintoDeportivo`,
    getPartidos: `${host}/listaPartidos`,
    getPartido: `${host}/detallePartido`,
};

const uriConfig = {
    apiEvento
};

export default uriConfig;