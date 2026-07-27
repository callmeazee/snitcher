import mongoose from 'mongoose';
import { config } from './config/config.js';
import productModel from './models/product.model.js';

async function seedExistingProducts() {
    console.log("--- SEEDING VARIANTS FOR EXISTING PRODUCTS IN DATABASE ---");
    await mongoose.connect(config.MONGO_URI);

    const allProducts = await productModel.find();
    console.log(`Found ${allProducts.length} total products in database. Checking variants...`);

    let updatedCount = 0;
    for (const product of allProducts) {
        if (!product.variants || product.variants.length === 0) {
            const imgList = product.images && product.images.length > 0
                ? product.images
                : [ { url: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800" } ];

            product.variants = [
                { images: imgList, stock: 15, attributes: { Size: "M", Color: "Black" }, price: product.price },
                { images: imgList, stock: 10, attributes: { Size: "L", Color: "White" }, price: product.price },
                { images: imgList, stock: 8, attributes: { Size: "XL", Color: "Camel" }, price: product.price }
            ];
            await product.save();
            updatedCount++;
            console.log(`  ✓ Seeded product "${product.title}" (${product._id}) with 3 variants (Sizes M, L, XL)`);
        }
    }

    console.log(`\n✅ DATABASE SEED COMPLETE: ${updatedCount} products updated with variants!`);
    process.exit(0);
}

seedExistingProducts().catch(err => {
    console.error("Migration Error:", err);
    process.exit(1);
});
