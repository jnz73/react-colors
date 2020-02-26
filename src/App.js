import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelper';

function App() {
    return (
        <Switch>
            <Route
                exact
                path="/"
                render={() => <h1>PALETTE LIST GOES HERE</h1>}
            />
            <Route exact path="/palette/:id" />
        </Switch>
    );
}

export default App;
