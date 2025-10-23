import './login.css';
import { userService } from '../../service/user.js';
import { useState, useEffect } from 'react';

const logiForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        const credentials = {
            email,
            password
        }
        userService.login(credentials).then(response => {
            if (response.success) {
                localStorage.setItem('user', JSON.stringify(response.user));
                // Redirect to dashboard or another page
                window.location.href = '/dashboard';
            } else {
                alert('Error de autenticación: ' + response.message);
            }
        });
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            window.location.href = '/dashboard';
        }
    }, []);

    return (
        <div className="login-container-global">
            <div className="login-container">
                <div className="login-card">
                    <i className="bi bi-shop-window icon-header"></i>
                    <h1 className="main-title">Sistemas de Información</h1>
                    <h2 className="subtitle">Post ventas</h2>

                    <div className="form-group">
                        <label htmlFor="nombreUsuario" className="form-label">Correo electrónico</label>
                        <div className="input-group-login">
                            <i className="bi bi-person input-icon-login"></i>
                            <input
                                type="email"
                                className="form-control-login"
                                id="nombreUsuario"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ingresa tu email"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <div className="input-group-login">
                            <i className="bi bi-lock input-icon-login"></i>
                            <input
                                type="password"
                                className="form-control-login"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Ingresa tu contraseña"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type='button'
                        className="login-button"
                        onClick={handleSubmit}
                    >
                        Iniciar Sesión
                    </button>

                    <div className="footer">
                        <small className="footer-text">
                            Hecho por Federico Henao &copy; 2025
                        </small>
                    </div>

                </div>
            </div>
        </div>
    );

}

export default logiForm;