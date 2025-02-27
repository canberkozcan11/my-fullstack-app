import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import Form from './Form';
import Listele from './Listele';
import NotFound from './NotFound';
import ChangePassword from './ChangePassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/form" element={<Form />} />
        <Route path="/form/:oid" element={<Form />} />
        <Route path="/listele" element={<Listele />} />
        <Route path="/parolachange" element={<ChangePassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
