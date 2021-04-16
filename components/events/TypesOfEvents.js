import React from 'react'
import { owners } from '../../data/demo-data/tasks';
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core';
import Item from './Item';

const useStyles = makeStyles({
content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    width: '100%'
    },
items: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flexWrap: 'wrap',
    marginLeft: '1rem' 
    },
title: {
    marginLeft: '1rem'
}
})

const TypesOfEvents = props => {
    const styles = useStyles()

    return (
        <Paper className={styles.content}>
            <h1 className={styles.title}>Types of Events</h1>
            <div className={styles.items}>
                {owners.map((item, index) =>
                    <Item key={index} text={item.text} color={item.color}/>
                )}
            </div>
        </Paper>
    )
}

export default TypesOfEvents