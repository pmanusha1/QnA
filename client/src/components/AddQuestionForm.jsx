import { useMutation } from '@apollo/client';
import React, { useState, useContext } from 'react';
import { CREATE_QUESTION } from '../graphql/mutation';
import { AuthContext } from '../context/AuthContext';
import { Box, Typography, TextField, Button } from '@mui/material';

const AddQuestionForm = ({ onSuccess }) => {
  const { user, token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [createQuestion, { loading, error }] = useMutation(CREATE_QUESTION, {
    context: { headers: { Authorization: `Bearer ${token}` } },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first!");
      return;
    }
    const res = await createQuestion({ variables: { title, body } });
    if (res.data) {
      setTitle("");
      setBody("");
      onSuccess?.();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mb: 3 }}>
      <Typography variant="h6">Ask a Question</Typography>
      <TextField label="Title" fullWidth value={title} onChange={e => setTitle(e.target.value)} sx={{ mb: 2 }} />
      <TextField label="Body" fullWidth multiline minRows={3} value={body} onChange={e => setBody(e.target.value)} sx={{ mb: 2 }} />
      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? "Posting..." : "Post Question"}
      </Button>
      {error && <Typography color="error">{error.message}</Typography>}
    </Box>
  );
};

export default AddQuestionForm;
