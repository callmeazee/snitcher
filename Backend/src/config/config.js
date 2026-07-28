import dotenv from "dotenv"
dotenv.config()


if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables")
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables")
}

if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID is not defined in environment variables")
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("GOOGLE_CLIENT_SECRET is not defined in environment variables")
}

if (!process.env.IMAGEKIT_PRIVATE_KEY) {
    throw new Error("IMAGEKIT_PRIVATE_KEY is not defined in environment variables")
}

if (!process.env.RAZORPAY_KEY_ID) {
    throw new Error("RAZORPAY_KEY_ID is not defined in environment variables")
}

if (!process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("RAZORPAY_KEY_SECRET is not defined in environment variables")
}
export const config = {
    MONGO_URI: process.env.MONGO_URI?.trim(),
    JWT_SECRET: process.env.JWT_SECRET?.trim(),
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID?.trim(),
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET?.trim(),
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL?.trim(),
    NODE_ENV: (process.env.NODE_ENV || "development").trim(),
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY?.trim(),
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID?.trim(),
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET?.trim(),
    CLIENT_URL: (process.env.CLIENT_URL || "https://snitcher-six.vercel.app").trim()
}

