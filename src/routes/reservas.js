const express = require('express');
const router = express.Router();
const { Reserva } = require('../models');

/**
 * @openapi
 * /reservas:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags:
 *       - Reservas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date-time
 *               cantidad_personas:
 *                 type: integer
 *               clienteId:
 *                 type: integer
 *               mesaId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Reserva creada
 *       400:
 *         description: Error de validación
 */
router.post('/', async (req, res) => {
  try {
    const reserva = await Reserva.create(req.body);
    res.status(201).json(reserva);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @openapi
 * /reservas:
 *   get:
 *     summary: Listar todas las reservas
 *     tags:
 *       - Reservas
 *     responses:
 *       200:
 *         description: Lista de reservas
 */
router.get('/', async (req, res) => {
  const reservas = await Reserva.findAll();
  res.json(reservas);
});

/**
 * @openapi
 * /reservas/{id}:
 *   get:
 *     summary: Obtener reserva por ID
 *     tags:
 *       - Reservas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *       404:
 *         description: No encontrada
 */
router.get('/:id', async (req, res) => {
  const reserva = await Reserva.findByPk(req.params.id);
  if (reserva) res.json(reserva);
  else res.status(404).json({ error: 'No encontrada' });
});

/**
 * @openapi
 * /reservas/{id}:
 *   put:
 *     summary: Actualizar reserva por ID
 *     tags:
 *       - Reservas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date-time
 *               cantidad_personas:
 *                 type: integer
 *               clienteId:
 *                 type: integer
 *               mesaId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Reserva actualizada
 *       400:
 *         description: Error de validación
 *       404:
 *         description: No encontrada
 */
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Reserva.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const reserva = await Reserva.findByPk(req.params.id);
      res.json(reserva);
    } else {
      res.status(404).json({ error: 'No encontrada' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @openapi
 * /reservas/{id}:
 *   delete:
 *     summary: Eliminar reserva por ID
 *     tags:
 *       - Reservas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reserva eliminada
 *       404:
 *         description: No encontrada
 */
router.delete('/:id', async (req, res) => {
  const deleted = await Reserva.destroy({ where: { id: req.params.id } });
  if (deleted) res.json({ mensaje: 'Eliminada' });
  else res.status(404).json({ error: 'No encontrada' });
});

module.exports = router;