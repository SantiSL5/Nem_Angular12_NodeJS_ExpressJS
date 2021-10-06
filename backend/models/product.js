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
        type: Number,
        enum : [1,2,3,4,5],
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
        type: Date,
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

module.exports = mongoose.model('Product', ProductSchema);