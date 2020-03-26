import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import MiniPalette from './MiniPalette';

import styles from './styles/PaletteListStyles';
class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.goToPalette = this.goToPalette.bind(this);
    }

    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }
    render() {
        const { palettes, classes, deletePalette } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Colors</h1>
                        <Link to="/palette/new">Create Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette => (
                            <CSSTransition
                                key={palette.id}
                                classNames="fade"
                                timeout={500}
                            >
                                <MiniPalette
                                    {...palette}
                                    key={palette.id}
                                    handleClick={() =>
                                        this.goToPalette(palette.id)
                                    }
                                    handleDelete={deletePalette}
                                    id={palette.id}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(PaletteList);
