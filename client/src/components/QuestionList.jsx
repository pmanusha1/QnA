import React from 'react';
import { Grid } from '@mui/material';
import QuestionCard from './QuestionCard';

const QuestionList = ({questions}) => {
  return (
    <div>
      <Grid container spacing={2}>
          {questions.map((q) => (
            <Grid item xs={12} md={6} key={q.id}>
              <QuestionCard question={q} />
            </Grid>
          ))}
        </Grid>
    </div>
  )
}

export default QuestionList