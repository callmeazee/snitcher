import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import { stockOfVariant } from "../dao/product.dao.js";
import mongoose from "mongoose";
import { createOrder } from "../services/payment.service.js";
import { getCartDetails } from "../dao/cart.dao.js";
import paymentModel from "../models/payment.model.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import { config } from "../config/config.js";




export const addToCart = async (req, res) => {

    let { productId, variantId } = req.params
    const { quantity = 1 } = req.body

    let product = null;

    if (variantId && variantId !== "undefined") {
        product = await productModel.findOne({
            _id: productId,
            "variants._id": variantId
        })
    }

    if (!product) {
        product = await productModel.findById(productId);
        if (product && product.variants && product.variants.length > 0) {
            variantId = product.variants[ 0 ]._id.toString();
        }
    }

    if (!product) {
        return res.status(404).json({
            message: "Product not found",
            success: false
        })
    }

    let stock = 10;
    if (product.variants && product.variants.length > 0) {
        const foundVar = product.variants.find(v => v._id.toString() === variantId);
        if (foundVar) {
            stock = foundVar.stock;
        } else {
            variantId = product.variants[ 0 ]._id.toString();
            stock = product.variants[ 0 ].stock;
        }
    }

    const cart = (await cartModel.findOne({ user: req.user._id })) ||
        (await cartModel.create({ user: req.user._id }))

    const isProductAlreadyInCart = cart.items.some(item => item.product.toString() === productId && item.variant?.toString() === variantId)

    if (isProductAlreadyInCart) {
        const quantityInCart = cart.items.find(item => item.product.toString() === productId && item.variant?.toString() === variantId).quantity
        if (quantityInCart + quantity > stock) {
            return res.status(400).json({
                message: `Only ${stock} items left in stock. and you already have ${quantityInCart} items in your cart`,
                success: false
            })
        }

        await cartModel.findOneAndUpdate(
            { user: req.user._id, "items.product": productId, "items.variant": variantId },
            { $inc: { "items.$.quantity": quantity } },
            { new: true }
        )

        return res.status(200).json({
            message: "Cart updated successfully",
            success: true
        })
    }

    if (quantity > stock) {
        return res.status(400).json({
            message: `Only ${stock} items left in stock`,
            success: false
        })
    }

    cart.items.push({
        product: productId,
        variant: variantId,
        quantity,
        price: product.price
    })

    await cart.save()

    return res.status(200).json({
        message: "Product added to cart successfully",
        success: true
    })
}

export const getCart = async (req, res) => {
    const user = req.user

    let cart = await getCartDetails(user._id)

    if (!cart) {
        cart = await cartModel.create({ user: user._id })
    }

    return res.status(200).json({
        message: "Cart fetched successfully",
        success: true,
        cart
    })
}

export const incrementCartItemQuantity = async (req, res) => {
    const { productId, variantId } = req.params

    const product = await productModel.findById(productId);

    if (!product) {
        return res.status(404).json({
            message: "Product not found",
            success: false
        })
    }

    const cart = await cartModel.findOne({ user: req.user._id })

    if (!cart) {
        return res.status(404).json({
            message: "Cart not found",
            success: false
        })
    }

    let stock = 10;
    if (product.variants && product.variants.length > 0) {
        const foundVar = product.variants.find(v => v._id.toString() === variantId);
        if (foundVar) stock = foundVar.stock;
    }

    const itemQuantityInCart = cart.items.find(item => item.product.toString() === productId && (variantId && variantId !== "undefined" ? item.variant?.toString() === variantId : true))?.quantity || 0

    if (itemQuantityInCart + 1 > stock) {
        return res.status(400).json({
            message: `Only ${stock} items left in stock. and you already have ${itemQuantityInCart} items in your cart`,
            success: false
        })
    }

    await cartModel.findOneAndUpdate(
        { user: req.user._id, "items.product": productId, ...(variantId && variantId !== "undefined" ? { "items.variant": variantId } : {}) },
        { $inc: { "items.$.quantity": 1 } },
        { new: true }
    )

    return res.status(200).json({
        message: "Cart item quantity incremented successfully",
        success: true
    })
}

export const decrementCartItemQuantity = async (req, res) => {
    const { productId, variantId } = req.params

    const cart = await cartModel.findOne({ user: req.user._id })

    if (!cart) {
        return res.status(404).json({
            message: "Cart not found",
            success: false
        })
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId && (variantId && variantId !== "undefined" ? item.variant?.toString() === variantId : true))

    if (itemIndex === -1) {
        return res.status(404).json({
            message: "Item not found in cart",
            success: false
        })
    }

    if (cart.items[ itemIndex ].quantity > 1) {
        cart.items[ itemIndex ].quantity -= 1
    } else {
        cart.items.splice(itemIndex, 1)
    }

    await cart.save()

    return res.status(200).json({
        message: "Cart item quantity decremented successfully",
        success: true
    })
}

export const removeCartItem = async (req, res) => {
    const { productId, variantId } = req.params

    const cart = await cartModel.findOne({ user: req.user._id })

    if (!cart) {
        return res.status(404).json({
            message: "Cart not found",
            success: false
        })
    }

    cart.items = cart.items.filter(item => !(item.product.toString() === productId && (variantId && variantId !== "undefined" ? item.variant?.toString() === variantId : true)))

    await cart.save()

    return res.status(200).json({
        message: "Item removed from cart successfully",
        success: true
    })
}

export const createOrderController = async (req, res) => {
    const { couponCode } = req.body || {};
    const cart = await getCartDetails(req.user._id);

    if (!cart || !cart.items || cart.items.length === 0) {
        return res.status(400).json({
            message: "Cart is empty",
            success: false
        });
    }

    let discountAmount = 0;
    const code = (couponCode || '').toUpperCase().trim();
    if (code === 'SNITCH10') {
        discountAmount = Math.round(cart.totalPrice * 0.10);
    } else if (code === 'SNITCH20') {
        discountAmount = Math.round(cart.totalPrice * 0.20);
    } else if (code === 'FIRST500') {
        discountAmount = Math.min(cart.totalPrice, 500);
    }

    const finalAmount = Math.max(0, cart.totalPrice - discountAmount);

    const order = await createOrder({ amount: finalAmount, currency: cart.currency || "INR" });

    const payment = await paymentModel.create({
        user: req.user._id,
        razorpay: {
            orderId: order.id,
        },
        price: {
            amount: finalAmount,
            currency: cart.currency || "INR"
        },
        orderItems: cart.items.map(item => ({
            title: item.product.title,
            productId: item.product._id,
            variantId: item.variant,
            quantity: item.quantity,
            images: item.product.variants?.images || item.product.images,
            description: item.product.description,
            price: {
                amount: item.product.variants?.price?.amount || item.product.price.amount,
                currency: item.product.variants?.price?.currency || item.product.price.currency
            }
        }))
    });

    return res.status(200).json({
        message: "Order created successfully",
        success: true,
        order: {
            ...order,
            keyId: config.RAZORPAY_KEY_ID
        }
    });
};

export const verifyOrderController = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        console.log("Verifying Razorpay Payment:", { razorpay_order_id, razorpay_payment_id, razorpay_signature });

        const payment = await paymentModel.findOne({
            "razorpay.orderId": razorpay_order_id,
            status: "pending"
        });

        if (!payment) {
            console.error("Payment record not found for order:", razorpay_order_id);
            return res.status(400).json({
                message: "Payment record not found",
                success: false
            });
        }

        // Native Razorpay SHA256 HMAC verification
        const crypto = await import('crypto');
        const expectedSignature = crypto.default
            .createHmac('sha256', config.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');

        const isPaymentValid = (expectedSignature === razorpay_signature);

        if (!isPaymentValid) {
            console.error("Signature mismatch! Expected:", expectedSignature, "Received:", razorpay_signature);
            payment.status = "failed";
            await payment.save();

            return res.status(400).json({
                message: "Payment verification failed: Invalid signature",
                success: false
            });
        }

        payment.status = "paid";
        payment.razorpay.paymentId = razorpay_payment_id;
        payment.razorpay.signature = razorpay_signature;

        await payment.save();

        // Clear user's cart on successful payment
        await cartModel.findOneAndUpdate({ user: req.user._id }, { items: [] });

        console.log("✅ Payment Verified & Cart Cleared for user:", req.user._id);

        return res.status(200).json({
            message: "Payment verified successfully",
            success: true
        });
    } catch (error) {
        console.error("verifyOrderController error:", error);
        return res.status(500).json({
            message: error.message || "Failed to verify order",
            success: false
        });
    }
};