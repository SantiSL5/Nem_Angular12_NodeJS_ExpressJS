const Product = require("../models/product");
const { Query } = require("mongoose");
const Category = require("../models/category");
const category = require("../models/category");

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
        queryfind={};
        if (req.query.cat != 'undefined' && req.query.cat != undefined) queryfind.category=req.query.cat;
        if (req.query.search != 'undefined' && req.query.search != undefined) queryfind.name=new RegExp('.*'+req.query.search+'*.',"i");
        if (req.query.ship == 'true') {
            ship=true;
            queryfind.shipping=true;
        }else if (req.query.ship == 'false') {
            ship=false;
            queryfind.shipping=false;
        }
        offset=Number(req.query.offset) || 0;
        limit=Number(req.query.limit) || 3;
        const products= await Product.find(queryfind).populate('categoryname').skip(offset*limit).limit(limit);
        const numproducts= await Product.aggregate([{$match:queryfind},{$count:"numproducts"}]);
        if (products.length==0) {
            res.json({'numproducts':0});
        }else {
            const result = {'numproducts': numproducts[0].numproducts,'products': products};
            res.json(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// exports.updateProduct = async (req, res) => {
//     try {
//         const {name, seller, category, state, description, ubication, price, shipping, issold, photo} = req.body;
//         let product = await Product.findOne({"slug":req.params.slug});

//         if(!product) {
//             res.status(404).json({ msg: 'No existe el producto'});
//         }else {
//             product.name = name;
//             product.seller = seller;
//             product.category = category;
//             product.state = state;
//             product.description = description;
//             product.ubication= ubication;
//             product.price= price;
//             product.shipping=shipping;
//             product.issold=issold;
//             product.photo=photo;
    
//             product = await Product.findOneAndUpdate({ "slug":req.params.slug},product, { new:true });
//             res.json(product);
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Hubo un error');
//     }
// }

exports.getProduct = async (req, res) => {
    try {
        let product = await Product.findOne({"slug":req.params.slug}).populate('categoryname');
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
            res.json({ msg: 'Producto eliminado con ??xito!' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}