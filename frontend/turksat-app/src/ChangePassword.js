import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

const ChangePassword = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

   debugger;
    const authHeader = {
        headers: {
          Authorization: 'Basic ' + btoa(`${username}:${password}`),
        },
      };

    // Parola değiştirme API isteği (axios ile)
    axios.post('http://localhost:8044/mus/api/change-password', {
      username: username,
      password: newPassword,
    },authHeader)
      .then(response => {
        setMessage("Parolanız başarıyla değiştirildi!");
      })
      .catch(error => {
        setMessage("Parola değiştirilirken bir hata oluştu.");
      });
  };

  const giris = () => {
    navigate('/')
  }

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ maxWidth: 400, margin: 'auto' }}>
        <Typography variant="h4" gutterBottom>Parola Değiştir</Typography>
        
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          
          <TextField
            label="Eski Parola"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          
          <TextField
            label="Yeni Parola"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 2, marginRight: 2 }}
          >
            Parolayı Değiştir
          </Button>

          <Button
            variant="contained"
            color="primary"
            type="button"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={giris}
          >
            Giriş
          </Button>
        </form>

        {message && (
          <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ChangePassword;
