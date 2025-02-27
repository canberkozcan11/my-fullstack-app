import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box, Grid, CircularProgress } from '@mui/material';
import { useNavigate,useParams } from 'react-router-dom';

const Form = () => {
  const [tcKimlikNo, setTcKimlikNo] = useState('');
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [kayitTarihi, setKayitTarihi] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' veya 'error'
  const navigate = useNavigate();
  const { oid } = useParams();

  const [loading, setLoading] = useState(false);

  // Kullanıcı bilgilerini localStorage'dan alma
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  // Eğer kullanıcı giriş yapmamışsa, login ekranına yönlendir
  if (!username || !password) {
    navigate('/');
  }

  // Basic Authentication için header'ı ayarlama
  const authHeader = {
    headers: {
      Authorization: 'Basic ' + btoa(`${username}:${password}`),
    },
  };

  const listele = () => {
    navigate('/listele')
  }

  const signout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    navigate('/')
  }

  // Form submit işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tcKimlikNo || !ad || !soyad || !kayitTarihi) {
      setMessage('Lütfen tüm alanları doldurun!');
      setMessageType('error');
      return;
    }

    

    // API'ye POST isteği gönderme
    try {
      const response = await axios.post('http://localhost:8044/mus/customer/saveOrUpdateCustomer', {
        oid: oid,
        tckn: tcKimlikNo,
        adi: ad,
        soyadi: soyad,
        kayitTarihi: kayitTarihi,
      }, authHeader);

      if (response.status === 200) {
        setMessage('Kayıt başarıyla yapıldı!');
        setMessageType('success');
      }
    } catch (error) {
      setMessage('Kaydetme işlemi başarısız oldu.');
      setMessageType('error');
      if(error.message.includes('401'))
        navigate('/')
    }
  };


  useEffect(() => {
    setLoading(true);
    // Eğer id varsa backend'e mevcut müşteri verisini almak için GET isteği gönderelim
    if (oid) {
        axios.get(`http://localhost:8044/mus/customer/findCustomerById/${oid}`,authHeader)
            .then(response => {
                setTcKimlikNo(response.data.tckn);
                setAd(response.data.adi);
                setSoyad(response.data.soyadi);
                setKayitTarihi(response.data.kayitTarihi);
                setLoading(false);
            })
            .catch(err => {
                setMessage("Müşteri verisi alınamadı.");
                setLoading(false);
                if(err.message.includes('401'))
                    navigate('/')
            });
    } else {
        setLoading(false);
    }
}, [oid]);


useEffect(()=>{
    if(!localStorage.getItem('username') && !localStorage.getItem('password')){
        navigate('/')
    }
},[])

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Kayıt Formu
        </Typography>

        {message && (
          <Typography color={messageType === 'success' ? 'green' : 'red'} variant="body1" mb={2}>
            {message}
          </Typography>
        )}

        {loading ? (
                <CircularProgress />
            ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="TC Kimlik No"
                variant="outlined"
                fullWidth
                value={tcKimlikNo}
                onChange={(e) => setTcKimlikNo(e.target.value)}
                required
                inputProps={{ maxLength: 11 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Adı"
                variant="outlined"
                fullWidth
                value={ad}
                onChange={(e) => setAd(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Soyadı"
                variant="outlined"
                fullWidth
                value={soyad}
                onChange={(e) => setSoyad(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Kayıt Tarihi"
                variant="outlined"
                fullWidth
                value={kayitTarihi}
                onChange={(e) => setKayitTarihi(e.target.value)}
                required
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} >
              <Button variant="contained" color="primary" type="submit" sx={{mr:'15px'}} >
                Kaydet
              </Button>
              <Button variant="contained" color="primary" type="button" sx={{mr:'15px'}}  onClick={listele} >
                Listele
              </Button>
              <Button variant="contained" color="primary" type="button" onClick={signout} >
                Çıkış
              </Button>
            </Grid>
          </Grid>
        </form>
            )}
      </Box>
    </Container>
  );
};

export default Form;
