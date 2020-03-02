import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom';

export default class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(
            this.props.palette,
            this.props.colorId
        );
        this.state = { format: 'hex' };
        this.changeFormat = this.changeFormat.bind(this);
    }

    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;

        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            );
        }
        return shades.slice(1);
    }

    changeFormat(val) {
        this.setState({ format: val });
    }

    render() {
        const { format } = this.state;
        const colorBoxes = this._shades.map(color => (
            <ColorBox
                key={color.name}
                background={color[format]}
                name={color.name}
                showLink={false}
            />
        ));
        return (
            <div className="SingleColorPalette Palette">
                <Navbar
                    handleChange={this.changeFormat}
                    showingAllColors={false}
                />
                <div className="Palette-colors">
                    {colorBoxes}
                    <div className="go-back ColorBox">
                        <Link
                            to={`/palette/${this.props.palette.id}`}
                            className="back-button"
                        >
                            GO BACK
                        </Link>
                    </div>
                </div>
                <PaletteFooter
                    paletteName={this.props.palette.id}
                    emoji={this.props.palette.emoji}
                />
            </div>
        );
    }
}
