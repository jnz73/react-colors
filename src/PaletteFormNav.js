import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: { display: 'flex' },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '64px'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    navBtns: {}
});

const drawerWidth = 400;
class PaletteFormNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newPaletteName: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
            this.props.palettes.every(
                ({ paletteName }) =>
                    paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }
    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    render() {
        const { classes, open } = this.props;
        const { newPaletteName } = this.state;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color="default"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.props.handleDrawerOpen}
                            edge="start"
                            className={classNames(
                                classes.menuButton,
                                open && classes.hide
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Create A palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <ValidatorForm
                            onSubmit={() =>
                                this.props.handleSubmit(newPaletteName)
                            }
                        >
                            <TextValidator
                                name="newPaletteName"
                                onChange={this.handleChange}
                                label="Palette Name"
                                value={this.state.newPaletteName}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={[
                                    'this field is required',
                                    'palette name not unique'
                                ]}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Save Palette
                            </Button>
                            <Link to="/">
                                <Button variant="contained" color="secondary">
                                    Go Back
                                </Button>
                            </Link>
                        </ValidatorForm>
                    </div>
                </AppBar>
            </div>
        );
    }
}
export default withStyles(styles, { withTheme: true })(PaletteFormNav);
