import React, { Component } from 'react';
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux';
import axios from 'axios';

import apiConfig from "./config/api";
const getPartido = `${apiConfig.apiEvento.getPartido}`;

class DetallePartido extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detallePartido: [],
        };
    }

    componentDidMount() {

        let id = this.props.match.params.id;

        axios.get(`${getPartido}/${id}`)
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({ detallePartido: res.data[0] });
                }
            });
    }

    render() {
        return (
            <div>
                <h1 className="text-capitalize">{this.state.detallePartido.nombre}</h1>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listado: state.listado
    }
}
export default connect(mapStateToProps)(DetallePartido);