import React, { Component } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import axios from 'axios';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import apiConfig from "./config/api";
import InvitarAmigo from './InvitarAmigo';
const getPartido = `${apiConfig.apiEvento.getPartido}`;
const mapStyles = {
    width: '93%',
    height: '120px',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
};

const styleCard = {
    paddingBottom: "120px"
}

class DetallePartido extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detallePartido: [],
            recinto: [],
            lat: '',
            lon: '',
        };
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        axios.get(`${getPartido}/${id}`)
            .then(res => {
                let coor = String(res.data.recinto.latLong);
                coor = coor.split(',');
                this.setState({ detallePartido: res.data.detalle, recinto: res.data.recinto, lat: parseFloat(coor[0]), lon: parseFloat(coor[1]) });
            });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col lg={12}><Button href="/" variant="info" size="sm">Volver</Button> <h1 className="text-capitalize">{this.state.detallePartido.nombre}</h1></Col>
                    <Col lg={6}>
                        <Card className="mb-2">
                            <Card.Body>
                                <h6 className="pb-3">Información del partido</h6>
                                <p><b>Fecha y Hora </b>: {this.state.detallePartido.fecha} {this.state.detallePartido.hora}</p>
                                <p><b>Tipo </b>: {this.state.detallePartido.tipopartido}</p>
                            </Card.Body>
                        </Card>
                        <Card style={styleCard}>
                            <Card.Body>
                                <Row>
                                    <Col lg={12}>
                                        <h6 className="pb-3">Información del recinto</h6>
                                        <p><b>Nombre </b>: {this.state.recinto.name}</p>
                                        <p><b>Teléfono </b>: {this.state.recinto.phone} {this.state.recinto.phone2 ? ' - ' + this.state.recinto.phone2 : ''}</p>
                                        <p><b>Calle </b>: {this.state.recinto.address}, {this.state.recinto.number}</p>
                                        <p><b>Comuna </b>: {this.state.recinto.common}</p>
                                    </Col>
                                    <Col lg={12} className="text-center">
                                        {
                                            this.state.lat !== '' && this.state.recinto.latLong !== ' ' ?
                                                <Map
                                                    google={this.props.google}
                                                    zoom={14}
                                                    style={mapStyles}
                                                    initialCenter={{ lat: this.state.lat, lng: this.state.lon }}
                                                >
                                                    <Marker position={{ lat: this.state.lat, lng: this.state.lon }} />
                                                </Map>
                                                : ''
                                        }
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={6}>
                        <Card className="mb-3">
                            <Card.Body>
                                <h6 className="pb-3">Invita a un amigo</h6>
                                <InvitarAmigo data={{ id: this.props.match.params.id }} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        detallePartido: state.detallePartido,
        recinto: state.recinto
    }
}
// export default connect(mapStateToProps)(GoogleApiWrapper({ apiKey: ("AIzaSyBzXlSk0X743Apt3FAWv3HePFNZZ5K0kE8") }))(DetallePartido);
export default connect(mapStateToProps)(GoogleApiWrapper({ apiKey: ('AIzaSyBzXlSk0X743Apt3FAWv3HePFNZZ5K0kE8') })(DetallePartido));

