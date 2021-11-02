const Category = require("../models/category");

exports.createCategory = async (req, res) => {
  try {
      let category;
      category = new Category(req.body);
      await category.save();
      res.send(category);
  } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
  }
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const {name, photo} = req.body;
        let category = await Category.findById(req.params.id);

        if(!category) {
            res.status(404).json({ msg: 'No existe la categoria'});
        }else {
            category.name= name;
            category.photo=photo;
    
            category = await Category.findOneAndUpdate({ "slug":req.params.slug},category, { new:true });
            res.json(category);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        let category = await Category.findOne({"slug":req.params.slug});
        if(!category) {
            res.status(404).json({ msg: 'No existe la categoria'});
        }else {
            await category.findOneAndRemove({ "slug":req.params.slug });
            res.json({ msg: 'Categoria eliminado con éxito!' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}