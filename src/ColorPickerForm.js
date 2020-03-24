import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';

const styles = {
    picker: { width: '100% !important', marginTop: '2rem' },
    addColor: {
        width: '100%',
        padding: '1rem',
        marginTop: '1rem',
        fontSize: '2rem'
    },
    colorNameInput: {
        width: '100%',
        height: '70px'
    }
};
class ColorPickerForm extends Component {
    constructor(props) {
        super(props);

        this.state = { currentColor: 'teal', newColorName: '' };
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', value =>
            this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', value =>
            this.props.colors.every(
                ({ color }) => color !== this.state.currentColor
            )
        );
    }

    updateCurrentColor(color) {
        console.log(color.hex);
        this.setState({ currentColor: color.hex });
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleSubmit() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        };
        this.props.addNewColor(newColor);
        this.setState({ newColorName: '' });
    }

    render() {
        const { paletteFull, classes } = this.props;
        const { currentColor, newColorName } = this.state;
        return (
            <div>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={this.updateCurrentColor}
                    className={classes.picker}
                />
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator
                        variant="filled"
                        margin="normal"
                        placeholder="Color Name"
                        className={classes.colorNameInput}
                        value={newColorName}
                        name="newColorName"
                        onChange={this.handleChange}
                        validators={[
                            'required',
                            'isColorNameUnique',
                            'isColorUnique'
                        ]}
                        errorMessages={[
                            'this field is required',
                            'color name not unique',
                            'color not unique'
                        ]}
                    />
                    <Button
                        className={classes.addColor}
                        variant="contained"
                        color="primary"
                        style={{
                            backgroundColor: paletteFull ? '' : currentColor
                        }}
                        type="submit"
                        disabled={paletteFull}
                    >
                        {paletteFull ? 'Palette Full' : 'Add Color'}
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}
export default withStyles(styles)(ColorPickerForm);
