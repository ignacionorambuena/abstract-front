import React, { Component } from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { getTipoPartido } from "./actions";
class ListadoPartidos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            listado: [],
        };
    }

    componentDidMount() {
        this.props.dispatch(getTipoPartido());
    }

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

                            <Modal show={this.state.show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Crear evento</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Nombre del partido</Form.Label>
                                            <Form.Control type="text" ref={(input) => this.getNombre = input} placeholder="Barcelona VS Real Madrid" />
                                        </Form.Group>

                                        <Form.Group controlId="exampleForm.ControlInput1">
                                            <Form.Label>Nombre del partido</Form.Label>
                                            <Form.Control type="text" placeholder="Barcelona VS Real Madrid" />
                                        </Form.Group>

                                        <input required type="text" ref={(input) => this.getTitle = input}
                                            placeholder="Enter Post Title" />
                                        <br /><br />
                                        <textarea required rows="5" ref={(input) => this.getMessage = input} cols="28"
                                            placeholder="Enter Post" />
                                        <br /><br />
                                        <button>Post</button>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Cerrar
                  </Button>
                                    <Button variant="primary" onClick={handleClose}>
                                        Crear
                  </Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         listado: state
//     }
// }
// export default connect(mapStateToProps)(ListadoPartidos);

ListadoPartidos.propTypes = {
    dispatch: PropTypes.any.isRequired,
    listado: PropTypes.array,
};
ListadoPartidos.defaultProps = {

};
/**
 * Se deben mapear los props acorde al state definido en el archivo state.js
 */
const mapStateToProps = (state) => ({
    listado: state.listado,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListadoPartidos);