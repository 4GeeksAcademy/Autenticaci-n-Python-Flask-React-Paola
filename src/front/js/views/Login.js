import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import "../../styles/home.css"; 

const Login = () => {
  const [name, setName] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.BACKEND_URL + '/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }), 
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.access_token); 
        setError('');
        alert('Inicio de sesión exitoso');
        navigate('/PerfilUsuario'); 
      } else {
        setError(data.msg || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Hubo un problema al intentar iniciar sesión');
    }
  };

  return (
    <div className="container p-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Iniciar sesión</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor='name' className="form-label">Nombre</label>
                  <input 
                    type="text" 
                    id='name'
                    className="form-control"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor='password' className="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    id='password'
                    className="form-control"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
                {error && <div className='alert alert-danger'>{error}</div>}
                <button type="submit" className="btn btn-primary w-100">
                  Iniciar sesión
                </button>
              </form>
              <div className="mt-3 text-center">
                <Link to="/" className="btn btn-link">Cancelar</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
