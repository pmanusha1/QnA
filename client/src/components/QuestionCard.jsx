import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

const QuestionCard = ({ question }) => {
  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h6">{question.title}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {question.body}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          by {question.author?.name || "Anonymous"}
        </Typography>
        <br />
        <Button
          component={Link}
          to={`/question/${question.id}`}
          size="small"
          variant="outlined"
          sx={{ mt: 1 }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
