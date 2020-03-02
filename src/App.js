import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelper';
import PaletteList from './PaletteList';

function App() {
    function findPalette(id) {
        return seedColors.find(function(palette) {
            return palette.id === id;
        });
    }
    return (
        <Switch>
            <Route
                exact
                path="/"
                render={routeProps => (
                    <PaletteList palettes={seedColors} {...routeProps} />
                )}
            />
            <Route
                exact
                path="/palette/:id"
                render={routeProps => (
                    <Palette
                        palette={generatePalette(
                            findPalette(routeProps.match.params.id)
                        )}
                    />
                )}
            />
            <Route
                path="/palette/:paletteId/:colorId"
                render={() => <h1>SINGLE COLOR PAGE</h1>}
            />
        </Switch>
    );
}

export default App;
