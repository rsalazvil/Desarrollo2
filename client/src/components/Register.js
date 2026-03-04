import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    wallet: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError("Las contraseñas no coinciden.");
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error al registrar");
      }

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Registro</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Nombre completo" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Teléfono" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Dirección" onChange={handleChange} required />
        <input type="text" name="city" placeholder="Ciudad" onChange={handleChange} required />
        <input type="text" name="country" placeholder="País" onChange={handleChange} required />
        <input type="text" name="wallet" placeholder="Billetera Metamask" onChange={handleChange} required />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
