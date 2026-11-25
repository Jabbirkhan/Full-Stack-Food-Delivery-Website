import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Array,
        required:true
    },
    sizes:{
        type:Array,
        required:true
    },
    available:{
        type:Boolean,
        default:true,
    }
},{timestamps:true});

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);