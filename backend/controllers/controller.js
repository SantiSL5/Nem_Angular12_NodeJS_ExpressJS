const Product = require("../models/model");

exports.createProduct = async (req, res) => {
  try {
      let product;
      product = new Product(req.body);
      await product.save();
      res.send(product);
  } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
  }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products); 
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { name, seller, categories, state, description, ubication, price, shipping, issold, photo} = req.body;
        let product = await Product.findById(req.params.id);

        if(!producto) {
            res.status(404).json({ msg: 'No existe el producto'});
        }else {
            product.name = name;
            product.seller = seller;
            product.categories = categories;
            product.state = state;
            product.description = description;
            product.ubication= ubication;
            product.price= price;
            product.shipping=shipping;
            product.issold=issold;
            product.photo=photo;
    
            product = await Product.findOneAndUpdate({ _id:req.params.id},product, { new:true });
            res.json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerProducto = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if(!product) {
            res.status(404).json({ msg: 'No existe el producto'});
        }else {
            res.json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarProducto = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if(!product) {
            res.status(404).json({ msg: 'No existe el producto'});
        }else {
            await Product.findOneAndRemove({ _id:req.params.id });
            res.json({ msg: 'Producto eliminado con éxito!' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}