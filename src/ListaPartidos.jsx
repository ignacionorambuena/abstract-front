import React, { Component } from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux';
import axios from 'axios';

import apiConfig from "./config/api";
const tipoPartido = `${apiConfig.apiEvento.getTipoPartido}`;
const recintoDeportivo = `${apiConfig.apiEvento.getRecintoDeportivo}`;

class ListadoPartidos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      listaTipoPartido: [],
      listaRecintoDeportivo: [],
      form: {
        name: '',
        tipoPartido: '',
        recintoDeportivo: '',
        date: '',
        hour: ''
      }
    };
  }

  componentDidMount() {
    axios.get(`${tipoPartido}`)
      .then(res => {
        if (res.data.length > 0) {
          this.setState({ listaTipoPartido: res.data });
        }
      });

    axios.get(`${recintoDeportivo}`)
      .then(res => {
        if (res.data.length > 0) {
          this.setState({ listaRecintoDeportivo: res.data });
        }
      });
  }

  cambioEstadoFormulario = (evento) => {
    const data = this.state.form;
    const ident = (typeof evento === "object") ? evento.target.id : "";
    // debugger;
    switch (ident) {
      case "inputName": {
        data.name = evento.target.value;
        break;
      }
      case "cmbTipoPartido": {
        data.tipoPartido = evento.target.value;
        break;
      }
      case "cmbRecintoDeportivo": {
        data.recintoDeportivo = evento.target.value;
        break;
      }
      case "inputDate": {
        data.date = evento.target.value;
        break;
      }
      case "inputHour": {
        data.hour = evento.target.value;
        break;
      }
      default:
        break;
    }

    this.setState({ form: data });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const title = this.getTitle.value;
    const message = this.getMessage.value;
    const data = {
      id: new Date(),
      title,
      message
    }
    this.props.dispatch({
      type: 'ADD_EVENTO',
      data
    });
    this.getTitle.value = '';
    this.getMessage.value = '';
  }

  render() {
    console.log(this.state)
    const handleShow = () => {
      this.setState({ show: true });
    }

    const handleClose = () => {
      this.setState({ show: false });
    }
    return (
      <div>
        <Container className="container py-4">
          <Row>
            <Col lg={8}>
              <h1>Listado de partidos</h1>
            </Col>
            <Col lg={4}>
              <Button variant="primary" onClick={handleShow}>
                Crear partido
              </Button>

              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={this.state.show}
                onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Crear evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {JSON.stringify(this.state.form)}
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} controlId="inputName">
                      <Form.Label column sm="3">
                        Nombre del partido
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          type="text"
                          value={this.state.form.name}
                          onChange={this.cambioEstadoFormulario}
                          placeholder="Barcelona VS Real Madrid"
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="cmbTipoPartido">
                      <Form.Label column sm="3">
                        Tipo de partido
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          as="select"
                          onChange={this.cambioEstadoFormulario}
                        >
                          <option>Seleccione</option>
                          {
                            this.state.listaTipoPartido.map((x, ind) => {
                              return (<option key={ind} value={x.id}>{x.nombre}</option>)
                            })
                          }
                        </Form.Control>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="cmbRecintoDeportivo">
                      <Form.Label column sm="3">
                        Recinto Deportivo
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          as="select"
                          onChange={this.cambioEstadoFormulario}
                        >
                          <option>Seleccione</option>
                          {
                            this.state.listaRecintoDeportivo.map((x, ind) => {
                              return (<option key={ind} value={x.ID}>{x.name}</option>)
                            })
                          }
                        </Form.Control>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="inputDate">
                      <Form.Label column sm="3">
                        Fecha partido
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          type="date"
                          value={this.state.form.date}
                          onChange={this.cambioEstadoFormulario}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="inputHour">
                      <Form.Label column sm="3">
                        Hora partido
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          type="time"
                          step="600"
                          value={this.state.form.hour}
                          onChange={this.cambioEstadoFormulario}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="inputHour">
                      <Form.Label column sm="3">

                      </Form.Label>
                      <Col sm="9" align="right">
                        <Button type="submit">Crear Evento</Button>
                      </Col>
                    </Form.Group>
                  </Form>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state
  }
}
export default connect(mapStateToProps)(ListadoPartidos);