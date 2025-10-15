import { User } from '../Models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { sequelize } from '../config/db.js';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'molerojesus69@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD 
    }
});

export async function registrarUsuario(req, res) {
  try {
    const { nombre, email, password, telefono } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ nombre, email, password: hashedPassword, telefono });
    res.status(201).json({ msg: 'Usuario registrado correctamente ✅', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
}

export async function iniciarSesion(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, nombre: user.nombre, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
}

export async function solicitarRestablecimiento(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(200).json({ msg: 'Si el correo electrónico existe, recibirás un enlace para restablecer tu contraseña.' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const mailOptions = {
        from: 'molerojesus69@gmail.com',
        to: user.email,
        subject: 'Restablecer Contraseña',
        html: `Haz clic en este enlace para restablecer tu contraseña: <a href="http://localhost:5500/reset-password.html?token=${token}">Restablecer Contraseña</a>`
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ msg: 'Si el correo electrónico existe, recibirás un enlace para restablecer tu contraseña.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al enviar el correo de restablecimiento' });
  }
}

export async function restablecerContraseña(req, res) {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(400).json({ msg: 'Token inválido o expirado.' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ msg: 'Contraseña actualizada exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al restablecer la contraseña' });
  }
}