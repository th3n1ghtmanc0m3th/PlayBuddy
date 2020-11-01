import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import {
  Avatar,
  CardContent,
  CardHeader,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';

const api_url = process.env.API_BASE_URL;

const fakeActivityData = {
  title: 'Muay Thai Session',
  location: 'My Garage',
  desc: 'A fun light paced one hour intro to muay thai.',
  author: {
    username: 'Jay',
    fullname: 'Jay Gohner',
    userId: 420,
    avatarURL: 'https://bullmuaythaikrabi.com/wp-content/uploads/2017/09/Bull-Muay-Thai-Krabi-fighters-news_6.jpg'
  },
};

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
      activityData: fakeActivityData,
      loadingData: {
        finished: false,
        error: false,
      },
      commentData: fakeCommentData,
      id: props.id,
    }
  }

  componentDidMount() {
    fetch(`${api_url}/activity/${this.state.id}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            activityData: result.activity,
            loadingData: {finished: true},
          });
        },
        (error) => {
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
    }=this.state;
    return (
      <Container>
        <Card>
          <CardHeader>
            {activityData.title}
          </CardHeader>
          <CardHeader
            avatar={(
              <Avatar
                alt={`${activityData.author.username}'s profile picture`}
                src={activityData.author.avatarURL}
              >
                {activityData.author.username}
              </Avatar>
            )}
            title={activityData.author.fullname}
            subheader={activityData.author.username}
          >
          </CardHeader>
          <CardContent>
            <Typography variant="h3" color="textSecondary">
              Location
          </Typography>
            <Typography variant="body2" color="textSecondary">
              Desc
          </Typography>
          </CardContent>
        </Card>
        <Paper>
          <List>
            {commentData.map((comment) => (
              <ListItem key={comment.author.username}>
                <ListItemAvatar>
                  <Avatar
                    alt={`${comment.author.username}'s profile picture`}
                    src={comment.author.avatarURL}
                  >
                    {comment.author.fullname}
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

};

ActivityPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ActivityPage;