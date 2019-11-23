import React, { Component } from 'react';
import { Button, Form, InputGroup, FormControl, Table, Modal, Badge } from 'react-bootstrap'
import { connect } from 'react-redux';
import axios from 'axios';

import apiConfig from "./config/api";
const listadoInvitados = `${apiConfig.apiEvento.getInvitados}`;
const insertInvitado = `${apiConfig.apiEvento.insertInvitado}`;
const deleteInvitado = `${apiConfig.apiEvento.deleteInvitado}`;
const confirmarInvitado = `${apiConfig.apiEvento.confirmarInvitado}`;
const rechazarInvitado = `${apiConfig.apiEvento.rechazarInvitado}`;

class InvitarAmigo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            listaInvitados: [],
            numeroInvitados: 0,
            idInvitado: 0,
            total: 0,
            tipoPartido: 0,
            form: {
                nombre: '',
            }
        };
    }

    refreshPage = () => {
        window.location.reload(false);
    }

    componentDidMount() {
        axios.get(`${listadoInvitados}/${this.props.data.id}`)
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({ listaInvitados: res.data, numeroInvitados: res.data.length, tipoPartido: res.data[0].tipo, total: this.getCantidad(res.data[0].tipo) });
                }
            });
    }

    changeStateForm = (evento) => {
        const data = this.state.form;
        const ident = (typeof evento === "object") ? evento.target.id : "";
        switch (ident) {
            case "inputName": {
                data.nombre = evento.target.value;
                break;
            }
            default:
                break;
        }

        this.setState({ form: data });
    };

    handleInvitarAmigo = (e) => {
        e.preventDefault();
        let data = this.state.form;
        data.idpartido = this.props.data.id;

        axios.post(`${insertInvitado}`, data)
            .then(res => {
                this.setState({ show: true, idInvitado: res.data.id });
            }).catch(err => console.log(err));
    }

    handleDelete = (id) => {
        axios.delete(`${deleteInvitado}/${id}`)
            .then(res => {
                if (res.data.length > 0) {
                    this.refreshPage();
                }

            });
    }
    handleAceptar = (id) => {
        axios.put(`${confirmarInvitado}/${id}`)
            .then(res => {
                if (res.data.length > 0) {
                    this.refreshPage();
                }

            });
    }
    handleRechazar = (id) => {
        axios.put(`${rechazarInvitado}/${id}`)
            .then(res => {
                if (res.data.length > 0) {
                    this.refreshPage();
                }

            });
    }
    handleModal = (id, nombre) => {
        this.setState({
            show: true,
            idInvitado: id,
            form: {
                nombre
            }
        });
    }

    getCantidad = (tipo) => {
        switch (tipo) {
            case 1:
                return 22;
            case 2:
                return 14;
            case 3:
                return 10;
            default:
                return 0;
        }

    }

    getEstado = (estado) => {
        switch (estado) {
            case 0:
                return 'Pendiente';
            case 1:
                return 'Aceptado';
            case 2:
                return 'Rechazado';
            default:
                return 0;
        }

    }

    render() {
        const handleClose = () => {
            this.setState({
                show: false,
                form: {
                    nombre: ''
                }
            });
        }
        return (
            <div>
                <Form onSubmit={this.handleInvitarAmigo}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Ingresa el nombre de un amigo"
                            aria-label="Ingresa el nombre de un amigo"
                            onChange={this.changeStateForm}
                            id="inputName"
                            value={this.state.form.nombre}
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button type="submit" variant="outline-secondary" variant="success" disabled={this.state.numeroInvitados === this.state.total && this.state.numeroInvitados !== 0}>Invitar</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
                <b>Llevas {this.state.numeroInvitados} de {this.state.total} invitados.</b>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listaInvitados.map((x, ind) => {
                            return (
                                <tr key={ind}>
                                    <td>{x.nombre}</td>
                                    <td>
                                        {this.getEstado(x.estado)}
                                        <Badge hidden={x.estado > 0} onClick={() => this.handleModal(x.id, x.nombre)} variant="warning" className="ml-2">!</Badge>
                                    </td>
                                    <td>
                                        <Button block hidden={x.estado > 0} onClick={() => this.handleDelete(x.id)} variant="danger" size="sm">Eliminar</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.show}
                    onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tienes una nueva invitación</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Estimad@ <b>{this.state.form.nombre}</b>, te han invitado a un partido</h6>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.handleAceptar(this.state.idInvitado)} variant="success" size="sm">Aceptar</Button>
                        <Button onClick={() => this.handleRechazar(this.state.idInvitado)} variant="danger" size="sm">Rechazar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listado: state.listado
    }
}
export default connect(mapStateToProps)(InvitarAmigo);