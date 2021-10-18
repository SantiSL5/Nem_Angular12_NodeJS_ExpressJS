const Product = require("../models/product");

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
        // return res.json({
        //     products: products.map(function(product){
        //       return product.toJSONFor();
        //     })
        // });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { name, seller, category, state, description, ubication, price, shipping, issold, photo} = req.body;
        let product = await Product.findById(req.params.id);

        if(!product) {
            res.status(404).json({ msg: 'No existe el producto'});
        }else {
            product.name = name;
            product.seller = seller;
            product.category = category;
            product.state = state;
            product.description = description;
            product.ubication= ubication;
            product.price= price;
            product.shipping=shipping;
            product.issold=issold;
            product.photo=photo;
    
            product = await Product.findOneAndUpdate({ "slug":req.params.slug},product, { new:true });
            res.json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getProduct = async (req, res) => {
    try {
        let product = await Product.findOne({"slug":req.params.slug});
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

exports.deleteProduct = async (req, res) => {
    try {
        let product = await Product.findOne({"slug":req.params.slug});
        if(!product) {
            res.status(404).json({ msg: 'No existe el producto'});
        }else {
            await Product.findOneAndRemove({ "slug":req.params.slug });
            res.json({ msg: 'Producto eliminado con éxito!' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}