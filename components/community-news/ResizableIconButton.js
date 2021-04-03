import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';

const ResizableIconButton = ({classes, size, ...props}) =>
    <IconButton className={classes[size]}
                {...props}/>;

const styles = {
    small: {
        '& svg': {
            fontSize: 18
        }
    },
    medium: {
        '& svg': {
            fontSize: 24
        }
    },
    large: {
        '& svg': {
            fontSize: 64,
            color: '#03b0b5'
        }
    }
};

export default withStyles(styles)(ResizableIconButton);