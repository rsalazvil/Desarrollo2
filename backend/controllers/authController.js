const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const send2FACode = require("../utils/send2FACode");

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      phone,
      address,
      city,
      country,
      wallet
    } = req.body;

    if (
      !fullName || !email || !password || !confirmPassword ||
      !phone || !address || !city || !country || !wallet
    ) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      phone,
      address,
      city,
      country,
      wallet
    });

    await user.save();

    res.status(201).json({ message: "Usuario registrado exitosamente." });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// Inicio de sesión (envío de código 2FA)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    // Generar código 2FA
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    user.twofactorCode = code;
    await user.save();

    await send2FACode(user.email, code);

    res.status(200).json({ message: "Código 2FA enviado", userId: user._id });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// Verificación del código 2FA
exports.verify2FA = async (req, res) => {
  try {
    const { userId, code } = req.body;

    const user = await User.findById(userId);
    if (!user || user.twofactorCode !== code) {
      return res.status(401).json({ message: "Código de verificación inválido." });
    }

    user.twofactorCode = null;
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error en verificación 2FA:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};
