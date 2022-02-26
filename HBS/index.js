const express = require('express');
const { Products } = require('../common/controllers/product.controller');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 8080;

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//TEMPLATE ENGINES
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: path.resolve(__dirname, './views/layouts'),
    partialsDir: path.resolve(__dirname, './views/partials')
}));
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index', { form: true });
});
app.get('/products', (req, res) => {
    let thereIsProducts = Products.getAll().length > 0;
    res.render('index', { list: true, productos: Products.getAll(), existProducts: thereIsProducts });
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
})