import cartModel from "../models/cart.model.js";
import mongoose from "mongoose";

export async function getCartDetails(userId) {
    const rawCart = await cartModel.findOne({ user: userId }).populate({
        path: 'items.product',
        model: 'product'
    }).lean();

    if (!rawCart || !rawCart.items || rawCart.items.length === 0) {
        return {
            _id: rawCart?._id,
            user: userId,
            items: [],
            totalPrice: 0,
            currency: 'INR'
        };
    }

    let totalPrice = 0;
    let currency = 'INR';

    const items = rawCart.items.map(item => {
        const product = item.product;
        if (!product) return null;

        let selectedVariant = null;
        if (item.variant && product.variants && product.variants.length > 0) {
            selectedVariant = product.variants.find(v => v._id?.toString() === item.variant?.toString());
        }
        if (!selectedVariant && product.variants && product.variants.length > 0) {
            selectedVariant = product.variants[ 0 ];
        }

        const priceAmount = selectedVariant?.price?.amount || product.price?.amount || 0;
        currency = selectedVariant?.price?.currency || product.price?.currency || 'INR';

        totalPrice += priceAmount * (item.quantity || 1);

        return {
            _id: item._id,
            product: product,
            variant: selectedVariant ? selectedVariant._id : item.variant,
            quantity: item.quantity || 1,
            price: {
                amount: priceAmount,
                currency
            }
        };
    }).filter(Boolean);

    return {
        _id: rawCart._id,
        user: userId,
        items,
        totalPrice,
        currency
    };
}