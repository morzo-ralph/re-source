const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
        name: String,
        description: String, 
        quantity: Number,
        category: String,
        price: Number,
        image: String,
        username: String,    
        supplier: String,
        isArchive: Number,
        created_at: Date,
        updated_at: Date
});

InventorySchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;

/*
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    brand: String, 
    description: String, 
    quantity:Number,
    category:String,
    price:Number,
    image:String,
    username:String,    
    supplier: String,
    created_at: Date,
    updated_at: Date
});
productSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) this.created_at = currentDate;
    next();
});

module.exports = mongoose.model('products',productSchema);

*/