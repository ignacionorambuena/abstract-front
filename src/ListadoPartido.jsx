import React, { Component } from 'react';
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import apiConfig from "./config/api";
const getPartidos = `${apiConfig.apiEvento.getPartidos}`;

class ListadoPartido extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listadoPartido: []
        };
    }

    componentDidMount() {
        axios.get(`${getPartidos}`)
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({ listadoPartido: res.data });
                }
            });
    }

    render() {
        return (
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Nombre partido</th>
                            <th>Tipo de partido</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listadoPartido.map((x, ind) => {
                            return (
                                <tr key={ind}>
                                    <td>{x.fecha}</td>
                                    <td>{x.nombre}</td>
                                    <td>{x.tipopartido}</td>
                                    <td>
                                        <Button href={'/detalle-partido/' + x.idpar} variant="success" size="sm">Ver</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listado: state.listado
    }
}
export default connect(mapStateToProps)(ListadoPartido);