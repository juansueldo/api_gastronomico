const express = require('express');
const router = express.Router();
const { Mesa } = require('../models');

/**
 * @openapi
 * /mesas:
 *   post:
 *     summary: Crear una nueva mesa
 *     tags:
 *       - Mesas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero:
 *                 type: integer
 *               capacidad:
 *                 type: integer
 *               disponible:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Mesa creada
 *       400:
 *         description: Error de validación
 */
router.post('/', async (req, res) => {
  try {
    const mesa = await Mesa.create(req.body);
    res.status(201).json(mesa);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @openapi
 * /mesas:
 *   get:
 *     summary: Listar todas las mesas
 *     tags:
 *       - Mesas
 *     responses:
 *       200:
 *         description: Lista de mesas
 */
router.get('/', async (req, res) => {
  const mesas = await Mesa.findAll();
  res.json(mesas);
});

/**
 * @openapi
 * /mesas/{id}:
 *   get:
 *     summary: Obtener mesa por ID
 *     tags:
 *       - Mesas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mesa encontrada
 *       404:
 *         description: No encontrada
 */
router.get('/:id', async (req, res) => {
  const mesa = await Mesa.findByPk(req.params.id);
  if (mesa) res.json(mesa);
  else res.status(404).json({ error: 'No encontrada' });
});

/**
 * @openapi
 * /mesas/{id}:
 *   put:
 *     summary: Actualizar mesa por ID
 *     tags:
 *       - Mesas
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
 *               numero:
 *                 type: integer
 *               capacidad:
 *                 type: integer
 *               disponible:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Mesa actualizada
 *       400:
 *         description: Error de validación
 *       404:
 *         description: No encontrada
 */
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Mesa.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const mesa = await Mesa.findByPk(req.params.id);
      res.json(mesa);
    } else {
      res.status(404).json({ error: 'No encontrada' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @openapi
 * /mesas/{id}:
 *   delete:
 *     summary: Eliminar mesa por ID
 *     tags:
 *       - Mesas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mesa eliminada
 *       404:
 *         description: No encontrada
 */
router.delete('/:id', async (req, res) => {
  const deleted = await Mesa.destroy({ where: { id: req.params.id } });
  if (deleted) res.json({ mensaje: 'Eliminada' });
  else res.status(404).json({ error: 'No encontrada' });
});

module.exports = router;