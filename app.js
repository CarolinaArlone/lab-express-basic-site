const express = require('express')
const { join } = require('path')
const { find } = require('./models/Product.model')


const app = express()
app.use(express.static('public'))
app.set('view engine', 'hbs')
app.set('views', join(__dirname, 'views'))


require('./db')

const Products = require('./models/Product.model')

app.get('/', (req, res) => {
    res.render('home');
    // res.send("hola si que funciono")
})

app.get('/tienda', (req, res) => {

    Products
        .find()

        .select({ title: 1, description: 1, price: 1 })
        .sort({ price: 1 })
        .limit(15)   // pongo yo el límite porque me apetece :)                     
        .then(allProducts => res.render('tienda', { allProducts: allProducts }))
        .catch(err => console.log(err))
    //res.send("Si que funciona la tienda")
})





app.listen(3000, () => console.log('🏃‍ on port 3000'))