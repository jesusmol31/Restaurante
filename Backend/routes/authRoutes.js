import express from 'express';
import { 
  registrarUsuario, 
  iniciarSesion, 
  solicitarRestablecimiento, 
  restablecerContraseña 
} from '../Controllers/authController.js';

const router = express.Router();

router.post('/register', registrarUsuario);
router.post('/login', iniciarSesion);
router.post('/forgot-password', solicitarRestablecimiento);
router.post('/reset-password', restablecerContraseña);

export default router;