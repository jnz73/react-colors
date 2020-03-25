import React from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/MiniPaletteStyles';

function MiniPalette(props) {
    const { classes, paletteName, emoji, colors } = props;
    const miniColorBoxes = colors.map(color => (
        <div
            className={classes.miniColors}
            style={{ backgroundColor: color.color }}
            key={color.name}
        />
    ));
    return (
        <div className={classes.root} onClick={props.handleClick}>
            <div className={classes.delete}>
                <DeleteIcon className={classes.deleteIcon} />
            </div>
            <div className={classes.colors}>{miniColorBoxes}</div>
            <h5 className={classes.title}>
                {paletteName}
                <span className={classes.emoji}>{emoji}</span>
            </h5>
        </div>
    );
}
export default withStyles(styles)(MiniPalette);
