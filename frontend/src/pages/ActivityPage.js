import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { Avatar, CardContent, CardHeader, Container, Paper, Typography } from '@material-ui/core';

const fakeActivityData = {
  title: "Muay Thai Session",
  location: "My Garage",
  desc: "A fun light paced one hour intro to muay thai.",
  author: {
    username: "Jay",
    fullname: "Jay Gohner",
    userId: 420,
    avatarURL: "https://bullmuaythaikrabi.com/wp-content/uploads/2017/09/Bull-Muay-Thai-Krabi-fighters-news_6.jpg"
  },
};

const ActivityPage = ({ id }) => {
  // this gets and sets state for activity data, comes from post id
  const [activityData, setActivityData] = useState(fakeActivityData);
  // this gets and sets loading
  const [loading, setLoading] = useState({
    running: false,
    finished: false,
    error: false
  });
  const [comments, setComments] = useState([]);

  return (
    <Container>
      <Card>
        <CardHeader>
          {id}
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
        {/* This will hold our comments, built using custom list components */}
      </Paper>
    </Container>

  );

};

ActivityPage.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ActivityPage;