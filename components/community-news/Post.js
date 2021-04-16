import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/ModeComment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Link from 'next/link';
import fetcher from '../../lib/fetcher';
import useSWR from 'swr';
import { Button, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '35rem',
    marginBottom: '2rem'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  postTitle: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  }
}));

export default function Post({ post, admin = false }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const { data } = useSWR('/api/unsplash', fetcher);
  const url = (data?.result.response.urls.regular || 'https://source.unsplash.com/random');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <React.Fragment>
        <Card className={classes.root}>
        <CardHeader
            avatar={
              <Link href={`/${post.username}/${post.slug}`}>
                <Avatar   
                  aria-label="user" 
                  className={classes.avatar}
                  src={post?.photoURL || '/static/images/anonymous'}
                >
                </Avatar>
              </Link>
            }
            action={
            <IconButton aria-label="settings">
                <MoreVertIcon />
            </IconButton>
            }
            title={
              <Link href={`/${post.username}/${post.slug}`}>
                <a className={classes.postTitle}>{post?.username || 'Anonymous User'} - Foster Parent since 2015</a>
              </Link>
            }
            subheader="2 days ago"
        />
        <CardMedia
            className={classes.media}
            image={url}
            title="post-image"
        />
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
            {post.content || ''}
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton aria-label="heart">
              <FavoriteIcon />
            </IconButton>
            <span style={{marginRight: '0.5rem'}}>
              {post.heartCount || 0}
            </span>
            <IconButton aria-label="comments" onClick={handleExpandClick}>
              <CommentIcon />
            </IconButton>
            <span>
              {post.commentsNumber || 0}
            </span>
            <IconButton
            className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon />
            </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
            <Typography paragraph>
                {post?.comments || "No comments yet!"}
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Add a nice comment right here..."
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
            >
              Post
            </Button>
            </CardContent>
        </Collapse>
        </Card>
    </React.Fragment>
  );
}
