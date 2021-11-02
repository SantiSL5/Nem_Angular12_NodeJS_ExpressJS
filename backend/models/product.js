const mongoose = require('mongoose');
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
        type: String,
        required: true
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
    issold: {
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
}, { versionKey: false });


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
        issold: this.issold,
        photo: this.photo,
        dateCreate: this.dateCreate
    }
}

module.exports = mongoose.model('Product', ProductSchema);