import React from 'react';
import { Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // navigate kullanımı

const NotFound = () => {
  const navigate = useNavigate(); // navigate fonksiyonu

  const handleGoHome = () => {
    navigate("/"); // Anasayfaya yönlendirme
  };

  return (
    <Container style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Sayfa Bulunamadı</h1>
      <p>Aradığınız sayfa mevcut değil. Lütfen doğru bir URL giriniz.</p>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        Anasayfaya Dön
      </Button>
    </Container>
  );
};

export default NotFound;
