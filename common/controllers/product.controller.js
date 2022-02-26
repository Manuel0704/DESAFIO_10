const { ProductsAPI } = require('../models/index');

const Products = new ProductsAPI();

const getAllProducts_ctrlr = (req, res) => {
    res.json(Products.getAll());
}

const getProductById_ctrlr = (req, res) => {
    const { id } = req.params;
    if (isNaN(+id)) return res.json({ error: 'El parametro debe ser un numero' });
    if (+id < 1 || +id > Products.products.length) return res.json({ error: 'El producto no fue encontrado' });
    res.json(Products.getById(id));
}

const createProduct_ctrlr = (req, res) => {
    const { title, price, thumbnail } = req.body;
    if (!title || !price || !thumbnail) return res.json({ error: 'datos insuficientes' });
    res.json(Products.save({ title: title, price: price, thumbnail: thumbnail }));
}

const updateProduct_ctrlr = (req, res) => {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;
    const updatedProduct = Products.update({ title: title, price: price, thumbnail: thumbnail }, id);
    if (updatedProduct.error) return res.status(404).send(updatedProduct.error);
    res.json(updatedProduct);
}

const deleteProduct_ctrlr = (req, res) => {
    const { id } = req.params;
    const deletedProduct = Products.delete(id);
    if (deletedProduct.error) return res.status(404).send(updatedProduct.error);
    res.json(deletedProduct);
}

module.exports = {
    getAllProducts_ctrlr,
    getProductById_ctrlr,
    createProduct_ctrlr,
    updateProduct_ctrlr,
    deleteProduct_ctrlr,
    Products
}