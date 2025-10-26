import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { CREATE_ANSWER } from '../graphql/mutation';
import { AuthContext } from '../context/AuthContext';
import { Box, TextField, Button } from '@mui/material';

const AddAnswerForm = ({ authorId, questionId, onSuccess}) => {
  const { user, token } = useContext(AuthContext)
  const [body, setBody] = useState("")

  const [addAnswer] = useMutation(CREATE_ANSWER, {
    context: { headers: { Authorization: `Bearer ${token}`}}
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please login first!');
    await addAnswer({ variables: { body, questionId}})
    setBody("")
    onSuccess?.();
  }
  
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Write your answer..."
        fullWidth
        multiline
        minRows={2}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ mt: 1 }}>
        Post Answer"
      </Button>
    </Box>
  )
}

export default AddAnswerForm