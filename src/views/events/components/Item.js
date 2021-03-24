import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';
import Circle from '@material-ui/icons/FiberManualRecord';
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
    content: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
        marginTop: '1rem',
        marginRight: '1rem',
        marginLeft: '1rem'
        },
    })

const Item = props => {
    const styles = useStyles()

    return (
        <Box className={styles.content}>
            <Circle style={{fill: props.color}}/>
            <Typography variant="h5" style={{ marginLeft: '10px', color: props.color }}>{props.text}</Typography>
        </Box>
    )
}

export default Item