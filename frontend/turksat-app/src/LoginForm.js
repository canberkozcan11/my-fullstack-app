import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' veya 'error'
  const navigate = useNavigate();

  // Login işlemi
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Kullanıcı adı ve parola gereklidir.');
      setMessageType('error');
      return;
    }

    // Basic Authentication için header'ı ayarlama
    const authHeader = {
      headers: {
        Authorization: 'Basic ' + btoa(`${username}:${password}`),
      },
    };

    // API'ye GET isteği gönderme
    try {
      const response = await axios.get('http://localhost:8044/mus/api/hello', authHeader);

      if (response.status === 200) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        navigate('/form');  // Başarılı ise form sayfasına yönlendir
      }
    } catch (error) {
      setMessage('Kullanıcı adı veya parola hatalı.');
      setMessageType('error');
    }
  };

  const sifredegistir = () => {
    navigate('/parolachange')
  }

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Giriş Yap
        </Typography>

        {message && (
          <Typography color={messageType === 'success' ? 'green' : 'red'} variant="body1" mb={2}>
            {message}
          </Typography>
        )}

        <form onSubmit={handleLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Kullanıcı Adı"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Parola"
                variant="outlined"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" sx={{mr:'15px'}}>
                Giriş Yap
              </Button>
              <Button variant="contained" color="primary" type="button" onClick={sifredegistir}>
                Şifreyi Değiştir
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
