import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || '';

const cartApiInstance = axios.create({
    baseURL: `${API_BASE}/api/cart`,
    withCredentials: true
});

cartApiInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export const addItem = async ({ productId, variantId }) => {
    const vId = variantId || "undefined";
    const response = await cartApiInstance.post(`/add/${productId}/${vId}`, {
        quantity: 1
    })

    return response.data
}

export const getCart = async () => {
    const response = await cartApiInstance.get("")
    return response.data
}

export const incrementCartItemApi = async ({ productId, variantId }) => {
    const vId = variantId || "undefined";
    const response = await cartApiInstance.patch(`/quantity/increment/${productId}/${vId}`)
    return response.data
}

export const decrementCartItemApi = async ({ productId, variantId }) => {
    const vId = variantId || "undefined";
    const response = await cartApiInstance.patch(`/quantity/decrement/${productId}/${vId}`)
    return response.data
}

export const removeCartItemApi = async ({ productId, variantId }) => {
    const vId = variantId || "undefined";
    const response = await cartApiInstance.delete(`/item/${productId}/${vId}`)
    return response.data
}

export const createCartOrder = async (couponCode) => {
    const response = await cartApiInstance.post("/payment/create/order", { couponCode })
    return response.data
}

export const verifyCartOrder = async ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
    const response = await cartApiInstance.post("/payment/verify/order", {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    })

    return response.data
}