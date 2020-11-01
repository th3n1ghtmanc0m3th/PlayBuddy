import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import {
  Avatar,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';

const api_url = 'http://localhost:3001/api';

const fakeCommentData = [
  {
    comment: 'This will be an hour long introductory course.',
    author: {
      username: 'Jay',
      fullname: 'Jay Gohner',
      userId: 420,
      avatarURL: 'https://bullmuaythaikrabi.com/wp-content/uploads/2017/09/Bull-Muay-Thai-Krabi-fighters-news_6.jpg'
    },
  },
];

class ActivityPage extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      activityData: null,
      loadingData: {
        finished: false,
        error: false,
      },
      commentData: fakeCommentData,
      id: props.id,
    }
  }

  componentDidMount() {
    fetch(`${api_url}/activity/${this.state.id}`, {
      //mode: 'same-origin',
    })
      .then(res => {
        console.log(res);
        return res.json()
      })
      .then(
        (result) => {
          this.setState({
            activityData: result.activity,
            loadingData: {finished: true},
          });
        },
        (error) => {
          console.log(error);
          this.setState({
            loadingData: {
              finished: false,
              error
            }
          });
        }
      )
  }

  render() {
    const {
      activityData,
      commentData,
      loadingData,
      id,
    }=this.state;
    if (loadingData.error) {
      return <div> Error</div>;
    }
    else if(!loadingData.finished) {
      return <CircularProgress/>;
    }
    else {
      return (
      <Container>
        <Card>
          <CardHeader
            avatar={(
              <Avatar
                //these postedBy's need to be changed
                alt={`${activityData.postedBy}'s profile picture`}
                src={activityData.postedBy}
              >
                {activityData.postedBy}
              </Avatar>
            )}
            title={activityData.postedBy}
            subheader={activityData.postedBy}
          >
          </CardHeader>
          <CardContent>
            <Typography variant="h3" color="textSecondary">
              {id}
          </Typography>
            <Typography variant="body2" color="textSecondary">
              Desc
          </Typography>
          </CardContent>
        </Card>
        <Paper>
          <List>
            {commentData.map((comment) => (
              <ListItem key={comment.postedBy}>
                <ListItemAvatar>
                  <Avatar
                    alt={`${comment.postedBy}'s profile picture`}
                    src={comment.postedBy}
                  >
                    {comment.postedBy}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>
                  {comment.comment}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>

    );
    }
    
  }

};

ActivityPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ActivityPage;