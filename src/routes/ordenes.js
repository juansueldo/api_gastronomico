const express = require('express');
const router = express.Router();
const { Orden, OrdenProducto, Producto } = require('../models');

/**
 * @openapi
 * /ordenes:
 *   post:
 *     summary: Crear una nueva orden
 *     tags:
 *       - Ordenes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 enum: [delivery, local]
 *               estado:
 *                 type: string
 *               direccion_entrega:
 *                 type: string
 *               clienteId:
 *                 type: integer
 *               productos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productoId:
 *                       type: integer
 *                     cantidad:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Orden creada
 *       400:
 *         description: Error de validación
 */
router.post('/', async (req, res) => {
  try {
    const { tipo, estado, direccion_entrega, clienteId, productos } = req.body;
    const orden = await Orden.create({ tipo, estado, direccion_entrega, clienteId });
    if (productos && productos.length > 0) {
      for (const p of productos) {
        await OrdenProducto.create({ ordenId: orden.id, productoId: p.productoId, cantidad: p.cantidad });
      }
    }
    res.status(201).json(orden);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @openapi
 * /ordenes:
 *   get:
 *     summary: Listar todas las ordenes
 *     tags:
 *       - Ordenes
 *     responses:
 *       200:
 *         description: Lista de ordenes
 */
router.get('/', async (req, res) => {
  const ordenes = await Orden.findAll({ include: [Producto] });
  res.json(ordenes);
});

/**
 * @openapi
 * /ordenes/{id}:
 *   get:
 *     summary: Obtener orden por ID
 *     tags:
 *       - Ordenes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Orden encontrada
 *       404:
 *         description: No encontrada
 */
router.get('/:id', async (req, res) => {
  const orden = await Orden.findByPk(req.params.id, { include: [Producto] });
  if (orden) res.json(orden);
  else res.status(404).json({ error: 'No encontrada' });
});

/**
 * @openapi
 * /ordenes/{id}:
 *   put:
 *     summary: Actualizar orden por ID
 *     tags:
 *       - Ordenes
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
 *               tipo:
 *                 type: string
 *                 enum: [delivery, local]
 *               estado:
 *                 type: string
 *               direccion_entrega:
 *                 type: string
 *               clienteId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Orden actualizada
 *       400:
 *         description: Error de validación
 *       404:
 *         description: No encontrada
 */
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Orden.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const orden = await Orden.findByPk(req.params.id);
      res.json(orden);
    } else {
      res.status(404).json({ error: 'No encontrada' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @openapi
 * /ordenes/{id}:
 *   delete:
 *     summary: Eliminar orden por ID
 *     tags:
 *       - Ordenes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Orden eliminada
 *       404:
 *         description: No encontrada
 */
router.delete('/:id', async (req, res) => {
  const deleted = await Orden.destroy({ where: { id: req.params.id } });
  if (deleted) res.json({ mensaje: 'Eliminada' });
  else res.status(404).json({ error: 'No encontrada' });
});

module.exports = router;