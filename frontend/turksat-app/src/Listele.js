import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button, Grid } from "@mui/material";

const Listele = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Basic Authentication için kullanıcı adı ve şifre
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    // findCustomer API'ye POST isteği gönderme
    const fetchCustomers = () => {
        setLoading(true);

        // İsteği POST etmek için herhangi bir parametre göndermiyoruz
        axios.post("http://localhost:8044/mus/customer/findCustomer", {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(username + ":" + password),
            }
        })
        .then(response => {
            setCustomers(response.data);
            setLoading(false);
        })
        .catch(error => {
            debugger;
            console.error("Müşteri listesi alınırken bir hata oluştu:", error);
            setLoading(false);
            if(error.message.includes('401'))
                navigate('/')
        });
    };

    useEffect(() => {
        fetchCustomers();  // sayfa yüklenince müşteri verilerini alalım
    }, []);


    const handleEdit = (oid) => {
        // Düzenleme butonuna tıklayınca ilgili id ile form sayfasına yönlendirme
        navigate(`/form/${oid}`);
    };

    const handleDelete = (oid) => {
        setLoading(true);

        // İsteği POST etmek için herhangi bir parametre göndermiyoruz
        axios.delete(`http://localhost:8044/mus/customer/deleteCustomer/${oid}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(username + ":" + password),
            }
        })
        .then(response => {
            setLoading(false);
            fetchCustomers();
        })
        .catch(error => {
            console.error("Müşteri listesi alınırken bir hata oluştu:", error);
            setLoading(false);
        });
    };

    

    const yenikayit = () => {
        navigate('/form');
    }

    const signout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        navigate('/')
      }

    return (
        <div style={{ padding: 20 }}>
            <h1>Müşteri Listesi</h1>
            {loading ? (
                <CircularProgress />
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="customer table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{visibility:'hidden'}}>ID</TableCell>
                                <TableCell align="center">TCKN</TableCell>
                                <TableCell align="center">Adı</TableCell>
                                <TableCell align="center">Soyadı</TableCell>
                                <TableCell align="center">Kayıt Tarihi</TableCell>
                                <TableCell align="center">Düzenle</TableCell>
                                <TableCell align="center">Sil</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.length > 0 ? (
                                customers.map((customer) => (
                                    <TableRow key={customer.oid}>
                                        <TableCell component="th" scope="row" style={{visibility:'hidden'}}>
                                            {customer.oid}
                                        </TableCell>
                                        <TableCell align="center">{customer.tckn}</TableCell>
                                        <TableCell align="center">{customer.adi}</TableCell>
                                        <TableCell align="center">{customer.soyadi}</TableCell>
                                        <TableCell align="center">{customer.kayitTarihi}</TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" color="primary" onClick={() => handleEdit(customer.oid)}>
                                                Düzenle
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" color="primary" onClick={() => handleDelete(customer.oid)}>
                                                Sil
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        Veri bulunamadı
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Grid item xs={12} >
              <Button variant="contained" color="primary" type="button" onClick={yenikayit} sx={{mr:'15px'}} >
                Yeni Kayıt
              </Button>
              <Button variant="contained" color="primary" type="button" onClick={signout} >
                Çıkış
              </Button>
            </Grid>
        </div>
    );
};

export default Listele;
