import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFACode, setTwoFACode] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep(2); // paso de código 2FA
      } else {
        setError(data.message || "Error al iniciar sesión.");
      }
    } catch (err) {
      setError("Error de red al intentar iniciar sesión.");
    }
  };

  const handleVerify2FA = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/verify-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: twoFACode }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser({ token: data.token }); // No se guarda en localStorage
        navigate("/dashboard");
      } else {
        setError(data.message || "Código inválido.");
      }
    } catch (err) {
      setError("Error de red al verificar el código.");
    }
  };

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>

      {step === 1 && (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Enviar código 2FA</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerify2FA}>
          <input
            type="text"
            placeholder="Código 2FA"
            value={twoFACode}
            onChange={(e) => setTwoFACode(e.target.value)}
            required
          />
          <button type="submit">Verificar código</button>
        </form>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
