import mongoose from 'mongoose';
import { config } from '../config/config.js';
import productModel from '../models/product.model.js';
import userModel from '../models/user.model.js';

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
                    { url: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 20,
                attributes: { "Color": "Raw Indigo", "Size": "30" },
                price: { amount: 4499, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 20,
                attributes: { "Color": "Raw Indigo", "Size": "32" },
                price: { amount: 4499, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 15,
                attributes: { "Color": "Jet Black", "Size": "32" },
                price: { amount: 4499, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=1000&q=80" }
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
                    { url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 25,
                attributes: { "Color": "Off-White", "Size": "M" },
                price: { amount: 3299, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 25,
                attributes: { "Color": "Off-White", "Size": "L" },
                price: { amount: 3299, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 18,
                attributes: { "Color": "Sand Dune", "Size": "M" },
                price: { amount: 3299, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80" }
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
                    { url: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 8,
                attributes: { "Color": "Obsidian Black", "Size": "M" },
                price: { amount: 12999, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 8,
                attributes: { "Color": "Obsidian Black", "Size": "L" },
                price: { amount: 12999, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 5,
                attributes: { "Color": "Espresso Brown", "Size": "M" },
                price: { amount: 12999, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80" }
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
                    { url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 14,
                attributes: { "Color": "Tailored Black", "Size": "32" },
                price: { amount: 3999, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 14,
                attributes: { "Color": "Tailored Black", "Size": "34" },
                price: { amount: 3999, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 11,
                attributes: { "Color": "Camel Tan", "Size": "32" },
                price: { amount: 3999, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80" }
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
                    { url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 30,
                attributes: { "Color": "Charcoal", "Size": "M" },
                price: { amount: 2799, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 22,
                attributes: { "Color": "Heather Grey", "Size": "L" },
                price: { amount: 2799, currency: "INR" }
            }
        ]
    },
    {
        title: "Midnight Velvet Tuxedo Blazer",
        description: "Statement evening blazer in deep velvet with silk satin peak lapels. Single-button silhouette with internal ticket pockets.",
        price: { amount: 8999, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80" }
        ],
        variants: [
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 7,
                attributes: { "Color": "Midnight Navy", "Size": "L" },
                price: { amount: 8999, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 4,
                attributes: { "Color": "Bordeaux Red", "Size": "M" },
                price: { amount: 8999, currency: "INR" }
            }
        ]
    },
    {
        title: "Minimalist Oversized Graphic Tee",
        description: "280 GSM combed cotton tee featuring a high-density archive crest print. Drop shoulder silhouette with relaxed collar line.",
        price: { amount: 1899, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80" }
        ],
        variants: [
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 40,
                attributes: { "Color": "Pitch Black", "Size": "M" },
                price: { amount: 1899, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 35,
                attributes: { "Color": "Chalk White", "Size": "L" },
                price: { amount: 1899, currency: "INR" }
            }
        ]
    },
    {
        title: "Obsidian Leather Chelsea Boots",
        description: "Handcrafted Italian calfskin leather Chelsea boots with elastic side gussets, stacked leather heel, and Blake stitch sole.",
        price: { amount: 9999, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1000&q=80" }
        ],
        variants: [
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 10,
                attributes: { "Color": "Polished Black", "Size": "42" },
                price: { amount: 9999, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 8,
                attributes: { "Color": "Polished Black", "Size": "44" },
                price: { amount: 9999, currency: "INR" }
            }
        ]
    },
    {
        title: "Structured Corduroy Utility Jacket",
        description: "Eight-wale cotton corduroy field jacket with deep box-pleated utility pockets, horn buttons, and soft flannel lining.",
        price: { amount: 4999, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=80" }
        ],
        variants: [
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 16,
                attributes: { "Color": "Tabac Brown", "Size": "L" },
                price: { amount: 4999, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 12,
                attributes: { "Color": "Forest Olive", "Size": "M" },
                price: { amount: 4999, currency: "INR" }
            }
        ]
    },
    {
        title: "Cashmere Blend Double-Breasted Overcoat",
        description: "Heavyweight wool-cashmere blend overcoat. Tailored with peak lapels, deep welt pockets, and a vent rear slit for a commanding profile.",
        price: { amount: 14999, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80" }
        ],
        variants: [
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 6,
                attributes: { "Color": "Camel", "Size": "L" },
                price: { amount: 14999, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 5,
                attributes: { "Color": "Charcoal Black", "Size": "XL" },
                price: { amount: 14999, currency: "INR" }
            }
        ]
    },
    {
        title: "Minimalist Ribbed Merino Knit Sweater",
        description: "100% Merino wool crewneck knit with subtle raglan sleeves and micro-ribbed collar, cuffs, and hem. Exceptionally insulating and lightweight.",
        price: { amount: 3799, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80" }
        ],
        variants: [
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 18,
                attributes: { "Color": "Cream White", "Size": "M" },
                price: { amount: 3799, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 15,
                attributes: { "Color": "Oatmeal Beige", "Size": "L" },
                price: { amount: 3799, currency: "INR" }
            }
        ]
    },
    {
        title: "Archive Flannel Plaid Button-Down",
        description: "Brushed cotton flannel shirt in a muted earth-tone plaid pattern. Features dual button-chest pockets and curved hem silhouette.",
        price: { amount: 2499, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80" }
        ],
        variants: [
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 22,
                attributes: { "Color": "Earth Brown", "Size": "L" },
                price: { amount: 2499, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 19,
                attributes: { "Color": "Forest Plaid", "Size": "M" },
                price: { amount: 2499, currency: "INR" }
            }
        ]
    },
    {
        title: "Monolith Leather Archive Crossbody",
        description: "Sculptural full-grain leather crossbody pouch with matte black buckle hardware, adjustable nylon strap, and waterproof interior lining.",
        price: { amount: 3499, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80" }
        ],
        variants: [
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 15,
                attributes: { "Color": "Matte Black", "Size": "One Size" },
                price: { amount: 3499, currency: "INR" }
            }
        ]
    },
    {
        title: "Pleated Wide-Leg Linen Trousers",
        description: "High-waisted wide-leg trousers in washed Italian linen. Features sharp front knife pleats, side slash pockets, and flowy silhouette.",
        price: { amount: 3499, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80" }
        ],
        variants: [
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 20,
                attributes: { "Color": "Parchment White", "Size": "30" },
                price: { amount: 3499, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 18,
                attributes: { "Color": "Parchment White", "Size": "32" },
                price: { amount: 3499, currency: "INR" }
            }
        ]
    },
    {
        title: "Raw Edge French Terry Sweatpants",
        description: "Relaxed fit sweatpants with raw bottom hem, elastic drawstring waist, and deep concealed zip pockets.",
        price: { amount: 2299, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80" }
        ],
        variants: [
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 25,
                attributes: { "Color": "Ash Grey", "Size": "M" },
                price: { amount: 2299, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 20,
                attributes: { "Color": "Ash Grey", "Size": "L" },
                price: { amount: 2299, currency: "INR" }
            }
        ]
    },
    {
        title: "Classic Satin Bomber Jacket",
        description: "Japanese nylon-satin bomber with ribbed collar and waist trim, heavy-duty metal zip, and orange contrast interior lining.",
        price: { amount: 5999, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80" }
        ],
        variants: [
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 14,
                attributes: { "Color": "Sage Green", "Size": "L" },
                price: { amount: 5999, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 10,
                attributes: { "Color": "Midnight Black", "Size": "XL" },
                price: { amount: 5999, currency: "INR" }
            }
        ]
    },
    {
        title: "Heavyweight Double-Knit Zip Polo",
        description: "Double-knit Pima cotton zip polo with quarter metal zipper, clean flat-knit collar, and tapered cuffs.",
        price: { amount: 2699, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80" }
        ],
        variants: [
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 22,
                attributes: { "Color": "Off-White", "Size": "M" },
                price: { amount: 2699, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 18,
                attributes: { "Color": "Off-White", "Size": "L" },
                price: { amount: 2699, currency: "INR" }
            }
        ]
    },
    {
        title: "Minimalist Suede Loafers",
        description: "Handcrafted suede penny loafers with soft calfskin footbed and flexible leather sole for effortless refinement.",
        price: { amount: 7999, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1000&q=80" }
        ],
        variants: [
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 12,
                attributes: { "Color": "Warm Taupe", "Size": "42" },
                price: { amount: 7999, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 9,
                attributes: { "Color": "Warm Taupe", "Size": "43" },
                price: { amount: 7999, currency: "INR" }
            }
        ]
    },
    {
        title: "Deconstructed Tailored Blazer",
        description: "Unlined, deconstructed summer blazer in stretch cotton-twill. Features soft shoulders, patch pockets, and unbuttoned cuffs.",
        price: { amount: 6499, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80" }
        ],
        variants: [
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 11,
                attributes: { "Color": "Dark Navy", "Size": "L" },
                price: { amount: 6499, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 8,
                attributes: { "Color": "Stone Beige", "Size": "M" },
                price: { amount: 6499, currency: "INR" }
            }
        ]
    },
    {
        title: "Heavyweight Waffle Knit Henley",
        description: "Thermodynamic waffle-knit thermal henley shirt with genuine horn buttons and soft flatlock stitching throughout.",
        price: { amount: 2199, currency: "INR" },
        images: [
            { url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80" },
            { url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80" }
        ],
        variants: [
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 25,
                attributes: { "Color": "Raw Linen", "Size": "M" },
                price: { amount: 2199, currency: "INR" }
            },
            {
                images: [
                    { url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80" },
                    { url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80" }
                ],
                stock: 20,
                attributes: { "Color": "Raw Linen", "Size": "L" },
                price: { amount: 2199, currency: "INR" }
            }
        ]
    }
];

async function seedCatalog() {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("Connected to MongoDB for 5-photo minimum product seeding...");

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

        console.log(`🔥 SUCCESSFULLY SEEDED ALL ${insertedProducts.length} PRODUCTS WITH EXACTLY 5 HD PHOTOS PER PRODUCT!`);
        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
}

seedCatalog();
