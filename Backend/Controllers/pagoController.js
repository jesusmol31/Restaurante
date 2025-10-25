import { PagoModel } from '../Models/Pago.js';

class PagoController {
  async agregarPago(req, res) {
    try {
      const { metodoPago, comprobantePago, fechaPago } = req.body;
      if (!metodoPago || !comprobantePago) return res.status(400).json({ error: 'metodoPago y comprobantePago son obligatorios' });

      const idPago = await PagoModel.agregarPago({ metodoPago, comprobantePago, fechaPago });
      res.status(201).json({ message: 'Pago registrado', idPago });
    } catch (error) {
      console.error('PagoController.agregarPago error:', error);
      res.status(500).json({ error: 'No se pudo registrar el pago' });
    }
  }

  async obtenerIdUltimoPago(req, res) {
    try {
      const idPago = await PagoModel.obtenerIdUltimoPago();
      res.json({ idPago });
    } catch (error) {
      console.error('PagoController.obtenerIdUltimoPago error:', error);
      res.status(500).json({ error: 'No se pudo obtener el último pago' });
    }
  }
}

export const pagoController = new PagoController();
export default pagoController;
