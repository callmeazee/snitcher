import mongoose from 'mongoose';
import { config } from '../config/config.js';
import productModel from '../models/product.model.js';
import userModel from '../models/user.model.js';
import fs from 'fs';
import path from 'path';

const sampleProducts = [
    {
        title: "Nocturnal Raw Indigo Denim",
        description: "Deep indigo Japanese raw denim with subtle stretch for comfort. Features brushed obsidian metal hardware and a refined slim-straight silhouette.",
        price: { amount: 4499, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=1000&q=80" }
        ],
        variants: [
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 20,
                attributes: { "Color": "Raw Indigo", "Size": "30" },
                price: { amount: 4499, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 20,
                attributes: { "Color": "Raw Indigo", "Size": "32" },
                price: { amount: 4499, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 15,
                attributes: { "Color": "Jet Black", "Size": "32" },
                price: { amount: 4499, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 15,
                attributes: { "Color": "Jet Black", "Size": "34" },
                price: { amount: 4499, currency: "INR" }
            }
        ]
    },
    {
        title: "Atelier European Linen Overshirt",
        description: "Crafted from 100% ethically sourced French linen. Off-white shade with dropped shoulder seams and Mother-of-Pearl buttons.",
        price: { amount: 3299, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80" }
        ],
        variants: [
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 25,
                attributes: { "Color": "Off-White", "Size": "M" },
                price: { amount: 3299, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 25,
                attributes: { "Color": "Off-White", "Size": "L" },
                price: { amount: 3299, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 18,
                attributes: { "Color": "Sand Dune", "Size": "M" },
                price: { amount: 3299, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 18,
                attributes: { "Color": "Sand Dune", "Size": "L" },
                price: { amount: 3299, currency: "INR" }
            }
        ]
    },
    {
        title: "Vanguard Genuine Lambskin Biker Jacket",
        description: "Heavyweight buttery soft lambskin leather with custom gunmetal hardware, asymmetrical zip closure, and silk lining.",
        price: { amount: 12999, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80" }
        ],
        variants: [
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 8,
                attributes: { "Color": "Obsidian Black", "Size": "M" },
                price: { amount: 12999, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 8,
                attributes: { "Color": "Obsidian Black", "Size": "L" },
                price: { amount: 12999, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 5,
                attributes: { "Color": "Espresso Brown", "Size": "M" },
                price: { amount: 12999, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 5,
                attributes: { "Color": "Espresso Brown", "Size": "L" },
                price: { amount: 12999, currency: "INR" }
            }
        ]
    },
    {
        title: "Monochrome Tailored Wool Trousers",
        description: "Tailored wool blend trousers featuring a relaxed straight drape, double front pleats, and hidden tab waistband closure.",
        price: { amount: 3999, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80" }
        ],
        variants: [
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 14,
                attributes: { "Color": "Tailored Black", "Size": "32" },
                price: { amount: 3999, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 14,
                attributes: { "Color": "Tailored Black", "Size": "34" },
                price: { amount: 3999, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 11,
                attributes: { "Color": "Camel Tan", "Size": "32" },
                price: { amount: 3999, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 11,
                attributes: { "Color": "Camel Tan", "Size": "34" },
                price: { amount: 3999, currency: "INR" }
            }
        ]
    },
    {
        title: "Graphite Heavyweight Loopback Hoodie",
        description: "450 GSM organic French terry cotton hoodie. Features double-layered hood, ribbed side gussets, and seamless pocket tailoring.",
        price: { amount: 2799, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80" }
        ],
        variants: [
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 30,
                attributes: { "Color": "Charcoal", "Size": "M" },
                price: { amount: 2799, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 22,
                attributes: { "Color": "Heather Grey", "Size": "L" },
                price: { amount: 2799, currency: "INR" }
            }
        ]
    }
];

async function seedCatalog() {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("Connected to MongoDB for product seeding...");

        let sellerUser = await userModel.findOne({ role: "seller" });
        if (!sellerUser) {
            sellerUser = await userModel.findOne();
        }
        if (!sellerUser) {
            sellerUser = await userModel.create({
                email: "seller_official@snitch.com",
                fullname: "Snitch Atelier",
                googleId: "official_seller_snitch_1",
                role: "seller"
            });
        }

        await productModel.deleteMany({});
        console.log("Cleared old product catalog.");

        const insertedProducts = await Promise.all(
            sampleProducts.map(p => productModel.create({ ...p, seller: sellerUser._id }))
        );

        // Export clean JSON for the user
        const jsonPath = path.join(process.cwd(), 'snitch_products_5_photos.json');
        fs.writeFileSync(jsonPath, JSON.stringify(insertedProducts, null, 2));

        console.log(`🔥 SUCCESSFULLY SEEDED ALL ${insertedProducts.length} PRODUCTS WITH 5 RELEVANT HD PHOTOS PER PRODUCT!`);
        console.log(`Saved clean JSON data to: ${jsonPath}`);
        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
}

seedCatalog();
