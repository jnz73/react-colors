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
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

export default class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stage: 'form',
            newPaletteName: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.savePalette = this.savePalette.bind(this);
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
    showEmojiPicker() {
        this.setState({ stage: 'emoji' });
    }
    savePalette(newEmoji) {
        const newPalette = {
            paletteName: this.state.newPaletteName,
            emoji: newEmoji.native
        };
        this.props.handleSubmit(newPalette);
    }
    render() {
        const { open, newPaletteName } = this.state;
        const { hideForm, handleSubmit } = this.props;
        return (
            <div>
                <Dialog
                    title="Pick a Palette Emoji"
                    open={this.state.stage === 'emoji'}
                    onClose={hideForm}
                >
                    <DialogTitle id="form-dialog-title">
                        Choose A Palette Emoji
                    </DialogTitle>
                    <Picker
                        title="Pick A Palette Emoji"
                        onSelect={this.savePalette}
                    />
                </Dialog>
                <Dialog
                    open={this.state.stage === 'form'}
                    aria-labelledby="form-dialog-title"
                    onClose={hideForm}
                >
                    <DialogTitle id="form-dialog-title">
                        Choose A Palette Name
                    </DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name for your new palette. Make
                                sure it's unique.
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
                            <Button onClick={hideForm} color="primary">
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
            </div>
        );
    }
}
