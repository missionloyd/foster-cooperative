import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { ButtonBase } from '@material-ui/core'
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    width: '24rem',
    marginBottom: '1rem',
  },
  cardAction: {
    textAlign: 'initial'
  },
  appBarLink: {
    textDecoration:'none', 
    color: 'black'
  },
})

const Item = props => {
  const classes = useStyles()

  const createMarkup = html => {
    return { __html: html }
  }

  return (
    <NavLink to='/communities/community-news' className={classes.appBarLink}>
      <Card className={classes.card}>
        <ButtonBase
          className={classes.cardAction}
        >
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            dangerouslySetInnerHTML={createMarkup(props.title)}
          />
          <Typography color="textSecondary" gutterBottom>
            Page: {props.user}
          </Typography>
          <Typography dangerouslySetInnerHTML={createMarkup(props.body)} />
        </CardContent>
        </ButtonBase>
      </Card>
    </NavLink>
  )
}

export default Item