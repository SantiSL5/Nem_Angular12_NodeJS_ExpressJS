const mongoose = require('mongoose');
const Category = require("../models/category");
const uniqueValitador = require('mongoose-unique-validator');
const slugf = require('slug');

const ProductSchema = mongoose.Schema({
    slug: {
        type: String,
        lowercase: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required:true
    },
    category: {
        type: String
    },
    state: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ubication: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shipping: {
        type: Boolean,
        default: false
    },
    photo: {
        type: String,
        required: true
    },
    dateCreate: {
        type: String,
        default: Date.now()
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false
});

ProductSchema.virtual('categoryname',{
    ref: 'Category',
    localField: 'category',
    foreignField: 'slug',
    justOne: true
})

ProductSchema.virtual('estado').get(function() {
    if (this.state==1) {
        return "Nuevo";
    }else if (this.state==2) {
        return "Como nuevo"
    }else if (this.state==3) {
        return "Seminuevo"
    }else if (this.state==4) {
        return "Desgastado"
    }else if (this.state==5) {
        return "Antiguo"
    }
});

ProductSchema.plugin(uniqueValitador, {message: 'is already taken'});

ProductSchema.pre('validate', function(next) {
    if (!this.slug) {
        this.slugify();
    }
    next();
});

ProductSchema.methods.slugify = function() {
    this.slug = slugf(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0);
};

ProductSchema.methods.toJSONfor = function() {
    return {
        slug: this.slug,
        name: this.name,
        seller: this.seller,
        category: this.category,
        state: this.state,
        description: this.description,      
        ubication: this.ubication,
        price: this.price,
        shipping: this.shipping,
        photo: this.photo,
        dateCreate: this.dateCreate,
        categoryname: this.categoryname
    }
}

module.exports = mongoose.model('Product', ProductSchema);