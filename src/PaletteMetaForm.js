import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import NewPaletteForm from './NewPaletteForm';

export default class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
            NewPaletteName: ''
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

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { open, newPaletteName } = this.state;
        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Choose A Palette Name
                </DialogTitle>
                <ValidatorForm
                    onSubmit={() => this.props.handleSubmit(newPaletteName)}
                >
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your new palette. Make sure
                            it's unique.
                        </DialogContentText>
                        <TextValidator
                            name="newPaletteName"
                            onChange={this.handleChange}
                            label="Palette Name"
                            fullWidth
                            margin="normal"
                            value={this.state.newPaletteName}
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={[
                                'this field is required',
                                'palette name not unique'
                            ]}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Save Palette
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        );
    }
}