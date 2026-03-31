const express = require('express');
const router = express.Router();
const { Cliente } = require('../models');

/**
 * @openapi
 * /clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags:
 *       - Clientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente creado
 *       400:
 *         description: Error de validación
 */
router.post('/', async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @openapi
 * /clientes:
 *   get:
 *     summary: Listar todos los clientes
 *     tags:
 *       - Clientes
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
router.get('/', async (req, res) => {
  const clientes = await Cliente.findAll();
  res.json(clientes);
});

/**
 * @openapi
 * /clientes/{id}:
 *   get:
 *     summary: Obtener cliente por ID
 *     tags:
 *       - Clientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: No encontrado
 */
router.get('/:id', async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (cliente) res.json(cliente);
  else res.status(404).json({ error: 'No encontrado' });
});

/**
 * @openapi
 * /clientes/{id}:
 *   put:
 *     summary: Actualizar cliente por ID
 *     tags:
 *       - Clientes
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
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente actualizado
 *       400:
 *         description: Error de validación
 *       404:
 *         description: No encontrado
 */
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Cliente.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const cliente = await Cliente.findByPk(req.params.id);
      res.json(cliente);
    } else {
      res.status(404).json({ error: 'No encontrado' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @openapi
 * /clientes/{id}:
 *   delete:
 *     summary: Eliminar cliente por ID
 *     tags:
 *       - Clientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente eliminado
 *       404:
 *         description: No encontrado
 */
router.delete('/:id', async (req, res) => {
  const deleted = await Cliente.destroy({ where: { id: req.params.id } });
  if (deleted) res.json({ mensaje: 'Eliminado' });
  else res.status(404).json({ error: 'No encontrado' });
});

module.exports = router;