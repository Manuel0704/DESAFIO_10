const express = require('express');
const { Products } = require('../common/controllers/product.controller');

const app = express();
const PORT = process.env.PORT || 8080;

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//TEMPLATE ENGINES
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('main');
});
app.get('/products', (req, res) => {
    res.render('products', { productos: Products.getAll()})
});
app.post('/products', (req, res) => {
    const { title, price, thumbnail } = req.body;
    if (!title || !price || !thumbnail) return res.json({ error: 'datos insuficientes' });
    Products.save({ title: title, price: price, thumbnail: thumbnail });
    res.redirect('/');
});

const myserver = app.listen(PORT, () => {
    console.log(`SERVIDOR ACTIVO EN EL PUERTO ${PORT}`);
});

myserver.on('error', error => {
    console.log('Error: ', error);
});