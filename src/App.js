import React from 'react';
import CrearPartido from './CrearPartido';
import ListadoPartido from './ListadoPartido';
import Container from 'react-bootstrap/Container';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import DetallePartido from './DetallePartido';

function App() {
  return (
    <div className="App">
      <Container className="container py-4">
        <Router>
          <Switch>
            <Route exact path="/">
              <CrearPartido />
              <ListadoPartido />
            </Route>
            <Route path="/detalle-partido/:id" render={(props) => <DetallePartido {...props} />} >
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
