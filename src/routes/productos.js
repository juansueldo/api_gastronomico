const express = require('express');
const router = express.Router();
const { Producto } = require('../models');

/**
 * @openapi
 * /productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               disponible:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Producto creado
 *       400:
 *         description: Error de validación
 */
router.post('/', async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @openapi
 * /productos:
 *   get:
 *     summary: Listar todos los productos
 *     tags:
 *       - Productos
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/', async (req, res) => {
  const productos = await Producto.findAll();
  res.json(productos);
});

/**
 * @openapi
 * /productos/{id}:
 *   get:
 *     summary: Obtener producto por ID
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: No encontrado
 */
router.get('/:id', async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (producto) res.json(producto);
  else res.status(404).json({ error: 'No encontrado' });
});

/**
 * @openapi
 * /productos/{id}:
 *   put:
 *     summary: Actualizar producto por ID
 *     tags:
 *       - Productos
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
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               disponible:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       400:
 *         description: Error de validación
 *       404:
 *         description: No encontrado
 */
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Producto.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const producto = await Producto.findByPk(req.params.id);
      res.json(producto);
    } else {
      res.status(404).json({ error: 'No encontrado' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @openapi
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar producto por ID
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: No encontrado
 */
router.delete('/:id', async (req, res) => {
  const deleted = await Producto.destroy({ where: { id: req.params.id } });
  if (deleted) res.json({ mensaje: 'Eliminado' });
  else res.status(404).json({ error: 'No encontrado' });
});

module.exports = router;