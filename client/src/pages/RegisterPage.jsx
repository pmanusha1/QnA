import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../graphql/auth';
import { saveUser } from '../utils/auth';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [register] = useMutation(REGISTER);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register({ variables: form });
      const { token, user } = data.register;
      saveUser(token, user);
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Box sx={{ width: 300, mx: 'auto', mt: 10 }}>
      <Typography style={{display: 'flex', justifyContent: 'center', fontSize: '2rem'}}>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          variant='outlined'
          margin="normal"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          label="Password"
          fullWidth
          type="password"
          margin="normal"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
        Already have an account?{' '}
        <Link component={Link} to="/login" underline="hover">
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default RegisterPage;
