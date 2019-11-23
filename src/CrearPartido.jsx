import React, { Component } from 'react';
import { Row, Col, Modal, Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux';
import axios from 'axios';

import apiConfig from "./config/api";
const tipoPartido = `${apiConfig.apiEvento.getTipoPartido}`;
const recintoDeportivo = `${apiConfig.apiEvento.getRecintoDeportivo}`;
const insertPartido = `${apiConfig.apiEvento.insertPartido}`;

class CrearEvento extends Component {
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

  refreshPage = () => {
    window.location.reload(false);
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

  changeStateForm = (evento) => {
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
    let data = this.state.form;
    axios.post(`${insertPartido}`, data)
      .then(res => {
        this.refreshPage();
      }).catch(err => console.log(err));

    this.setState({
      show: false,
      form: {
        name: '',
        tipoPartido: '',
        recintoDeportivo: '',
        date: '',
        hour: ''
      }
    });
  }

  render() {
    const handleShow = () => {
      this.setState({
        show: true,
        form: {
          name: '',
          tipoPartido: '',
          recintoDeportivo: '',
          date: '',
          hour: ''
        }
      });
    }

    const handleClose = () => {
      this.setState({
        show: false,
        form: {
          name: '',
          tipoPartido: '',
          recintoDeportivo: '',
          date: '',
          hour: ''
        }
      });
    }
    return (
      <div>
        <Row>
          <Col lg={8}>
            <h1>Listado de partidos</h1>
          </Col>
          <Col lg={4} className="text-right">
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
                <form onSubmit={this.handleSubmit} method="post">
                  <Form.Group as={Row} controlId="inputName">
                    <Form.Label column sm="3">
                      Nombre del partido
                      </Form.Label>
                    <Col sm="9">
                      <Form.Control
                        type="text"
                        value={this.state.form.name}
                        onChange={this.changeStateForm}
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
                        onChange={this.changeStateForm}
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
                        onChange={this.changeStateForm}
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
                        onChange={this.changeStateForm}
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
                        onChange={this.changeStateForm}
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
                </form>
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listado: state.listado
  }
}
export default connect(mapStateToProps)(CrearEvento);