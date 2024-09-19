import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/home.css";

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); 
        alert('Inicio de sesión exitoso');
        setError('');
        window.location.href = '/PerfilUsuario';
      } else {
        setError(data.msg || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Hubo un problema al intentar iniciar sesión');
    }
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2 className='login-title'>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor='password'>Contraseña:</label>
            <input 
              type="password" 
              id='password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          {error && <p className='error-message'>{error}</p>}
          <div className='button-group'>
            <button type="submit" className='btn-submitL'>Iniciar sesión</button>
            <Link to="/" className='btn-cancelL'>Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;