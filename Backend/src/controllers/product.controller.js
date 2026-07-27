import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";


export async function createProduct(req, res) {
    try {
        const { title, description, priceAmount, priceCurrency, stock, attributes } = req.body;
        const seller = req.user;

        const files = req.files || [];
        let images = [];

        if (files.length > 0) {
            try {
                images = await Promise.all(files.map(async (file) => {
                    const uploaded = await uploadFile({
                        buffer: file.buffer,
                        fileName: file.originalname
                    });
                    return { url: uploaded.url || uploaded.fileUrl || "" };
                }));
                images = images.filter(img => img.url);
            } catch (err) {
                console.error("Image upload failed, using default placeholder:", err);
            }
        }

        if (images.length === 0) {
            images = [{ url: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800" }];
        }

        let initialAttributes = { "Size": "M" };
        if (attributes) {
            try {
                initialAttributes = typeof attributes === 'string' ? JSON.parse(attributes) : attributes;
            } catch (e) {
                initialAttributes = { "Size": "M" };
            }
        }

        const defaultVariant = {
            images: images,
            stock: (!isNaN(Number(stock)) && stock !== undefined && stock !== "") ? Number(stock) : 10,
            attributes: initialAttributes,
            price: {
                amount: Number(priceAmount),
                currency: priceCurrency || "INR"
            }
        };

        const product = await productModel.create({
            title,
            description,
            price: {
                amount: Number(priceAmount),
                currency: priceCurrency || "INR"
            },
            images,
            variants: [ defaultVariant ],
            seller: seller._id
        });

        return res.status(201).json({
            message: "Product created successfully",
            success: true,
            product
        });
    } catch (error) {
        console.error("createProduct Error:", error);
        return res.status(500).json({
            message: error.message || "Failed to create product",
            success: false
        });
    }
}

export async function getSellerProducts(req, res) {
    try {
        const seller = req.user;
        const products = await productModel.find({ seller: seller._id });

        return res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            products
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

export async function getAllProducts(req, res) {
    try {
        const products = await productModel.find();

        return res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            products
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

export async function getProductDetails(req, res) {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Product details fetched successfully",
            success: true,
            product
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}


export async function addProductVariant(req, res) {
    try {
        const productId = req.params.productId;

        const product = await productModel.findOne({
            _id: productId,
            seller: req.user._id
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }

        const files = req.files || [];
        let images = [];
        if (files.length > 0) {
            try {
                const uploadedImages = await Promise.all(files.map(async (file) => {
                    const uploaded = await uploadFile({
                        buffer: file.buffer,
                        fileName: file.originalname
                    });
                    return { url: uploaded.url || uploaded.fileUrl || "" };
                }));
                images = uploadedImages.filter(img => img.url);
            } catch (err) {
                console.error("Variant image upload failed:", err);
            }
        }

        if (images.length === 0 && product.images && product.images.length > 0) {
            images = product.images;
        }

        const price = req.body.priceAmount;
        const stock = req.body.stock;
        let attributes = {};
        try {
            attributes = typeof req.body.attributes === 'string' ? JSON.parse(req.body.attributes || "{}") : (req.body.attributes || {});
        } catch (e) {
            attributes = {};
        }

        const numPrice = Number(price);
        const variantPrice = (!isNaN(numPrice) && price !== undefined && price !== "undefined" && price !== "")
            ? numPrice
            : product.price.amount;

        product.variants.push({
            images,
            price: {
                amount: variantPrice,
                currency: req.body.priceCurrency || product.price.currency
            },
            stock: !isNaN(Number(stock)) ? Number(stock) : 0,
            attributes
        });

        await product.save();

        return res.status(200).json({
            message: "Product variant added successfully",
            success: true,
            product
        });
    } catch (error) {
        console.error("addProductVariant Error:", error);
        return res.status(500).json({
            message: error.message || "Failed to add variant",
            success: false
        });
    }
}