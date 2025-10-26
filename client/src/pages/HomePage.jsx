import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Typography, CircularProgress, TextField, Button, Box } from '@mui/material';
import QuestionCard from '../components/QuestionCard';
import AddQuestionForm from '../components/AddQuestionForm';
import { GET_QUESTIONS } from '../graphql/mutation';
import { getUser, logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import QuestionList from '../components/QuestionList';

const HomePage = () => {
  const { data, loading, error, refetch } = useQuery(GET_QUESTIONS);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const user = getUser();
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  
  if (!user) return null;

  const filtered = data?.questions?.filter(
    (q) =>
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.body.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const askQuestion = () => {
    setShowForm(!showForm)
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        All Questions
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Button onClick={askQuestion} startIcon={<PlaylistAddIcon />}>
          Ask Question
        </Button>
        <Button onClick={() => { logout(); navigate("/login"); }} variant="outlined">
          Logout
        </Button>
      </Box>

      {showForm && <AddQuestionForm onSuccess={() => { refetch(); setShowForm(false); }} />}

      <TextField
        label="Search questions..."
        fullWidth
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Error: {error.message}</Typography>
      ) : (
        <QuestionList questions = {filtered} />
      )}
    </div>
  );
};

export default HomePage;