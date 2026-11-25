import { Product } from "./../models/productModel.js";
import uploadOnCloundinary from "./../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

const uploadProduct = async (req, res) => {
    try {

        let { name, description, category, price, sizes } = req.body

        if (!name || !description || !category || !price || !sizes) {
            return res.status(400).json({ success: false, message: "All Fields are required" });
        }

        if (price) {
            try {
                price = JSON.parse(price);
            } catch (error) {
                price = price.split(',').map(p => Number(p));
            }
        }
        
        if (sizes) {
            try {
                sizes = JSON.parse(sizes);
            } catch (error) {
                sizes = sizes.split(',').map(size => size.trim());
            }
        }

        // const image = req.file.image.path;
        const image = req.file?.path;
        if (!image) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        const uploadImage = await uploadOnCloundinary(image);

        const product = await Product.create({
            image: uploadImage.secure_url,
            name,
            description,
            category,
            price,
            sizes,
        });

        if (!product) {
            return res.json({ success: false, message: "Product is not added" })
        }

        return res.status(201).json({ success: true, message: "Product added successfully", product });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        let { name, description, category, price, sizes } = req.body

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found!" });
        }

        if (price) {
            try {
                price = JSON.parse(price);
            } catch (error) {
                price = price.split(',').map(p => Number(p));
            }
        }

        if (sizes) {
            try {
                sizes = JSON.parse(sizes);
            } catch (error) {
                sizes = sizes.split(',').map(size => size.trim());
            }
        }

        const image = req.file?.path;

        // If we did not have new images then we saved the old images
        let finalImage = product.image;

        // Delete old images from cloudinary if we have images and then uploading new images
        if (image) {
            const publicId = product.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
            const uploadImage = await uploadOnCloundinary(image);
            finalImage = uploadImage.secure_url;
        }
        

        product.image = finalImage;
        if (name) product.name = name;
        if (description) product.description = description;
        if (category) product.category = category;
        if (price) product.price = price;
        if (sizes) product.sizes = sizes;

        const updatedproduct = await product.save();
        if (!updatedproduct) {
            return res.status(400).json({ success: false, message: "Product not updated!" });
        }

        return res.status(200).json({ success: true, message: "Product updated successfully", product: updatedproduct });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const updateAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const { availability } = req.body;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found!" });
        }

        product.available = availability === true ? true : false;

        const updatedproduct = await product.save();
        if (!updatedproduct) {
            return res.status(400).json({ success: false, message: "Product not updated!" });
        }

        return res.status(200).json({ success: true, message: "Product updated successfully", product: updatedproduct });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const productList = async (req, res) => {
    try {
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 1;
        const category = req.query.category || '';

        if (page < 1) page = 1;
        if (limit < 1) limit = 1;

        const skip = (page - 1) * limit;

        const filter = {};

        if (category) {
            filter.category = category;
        }

        const products = await Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const newProducts = await Product.find().sort({ createdAt: -1 });
        const categories = await Product.distinct('category');
        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limit);

        return res.status(200).json({ success: true, products, categories, newProducts, totalProducts, totalPages, currentPage: page });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product is not Found" });
        }
        
        const publicId = product.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);        

        await Product.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export { uploadProduct, updateProduct, productList, deleteProduct, updateAvailability };