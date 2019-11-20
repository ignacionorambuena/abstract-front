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
      show: true,
      listaTipoPartido: [],
      listaRecintoDeportivo: [],
      form: {
        name: '',
        tipoPartido: ''
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

                    <Form.Group as={Row} controlId="cmbRecinto">
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
                            this.state.listaTipoPartido.map((x, ind) => {
                              return (<option key={ind} value={x.id}>{x.nombre}</option>)
                            })
                          }
                        </Form.Control>
                      </Col>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                {/* <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                    Cerrar
                  </Button>
                  <Button variant="success" onClick={handleClose}>
                    Crear partido
                  </Button>
                </Modal.Footer> */}
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