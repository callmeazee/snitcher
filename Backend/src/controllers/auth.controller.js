import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { config } from "../config/config.js";


async function sendTokenResponse(user, res, message) {

    const token = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET, {
        expiresIn: "7d"
    })

    const isProd = config.NODE_ENV === "production";
    res.cookie("token", token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/"
    })

    res.status(200).json({
        message,
        success: true,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role
        }
    })

}


export const register = async (req, res) => {
    const { email, contact, password, fullname, isSeller } = req.body;

    try {
        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { contact }
            ]
        })

        if (existingUser) {
            return res.status(400).json({ message: "User with this email or contact already exists" });
        }

        const user = await userModel.create({
            email,
            contact,
            password,
            fullname,
            role: isSeller ? "seller" : "buyer"
        })

        await sendTokenResponse(user, res, "User registered successfully")

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    await sendTokenResponse(user, res, "User logged in successfully")
}

export const googleCallback = async (req, res) => {
    const clientUrl = config.CLIENT_URL || process.env.CLIENT_URL || "http://localhost:5173";
    try {
        if (!req.user) {
            console.error("googleCallback Error: req.user is missing");
            return res.redirect(`${clientUrl}/login?error=no_user`);
        }

        const { id, displayName, emails, photos } = req.user;
        const email = emails?.[ 0 ]?.value;

        if (!email) {
            console.error("googleCallback Error: No email in Google profile", req.user);
            return res.redirect(`${clientUrl}/login?error=no_email`);
        }

        const profilePic = photos?.[ 0 ]?.value || "";
        const role = req.query.state === "seller" ? "seller" : "buyer";
        const fullname = displayName || email.split("@")[ 0 ] || "Google User";

        let user = await userModel.findOne({
            email
        });

        if (!user) {
            user = await userModel.create({
                email,
                googleId: id,
                fullname,
                role
            });
        } else if (!user.googleId) {
            user.googleId = id;
            await user.save();
        }

        const token = jwt.sign({
            id: user._id,
        }, config.JWT_SECRET, {
            expiresIn: "7d"
        });

        const isProd = config.NODE_ENV === "production";
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        });

        return res.redirect(`${clientUrl}/`);
    } catch (error) {
        console.error("googleCallback Error:", error);
        const clientUrl = config.CLIENT_URL || process.env.CLIENT_URL || "http://localhost:5173";
        return res.redirect(`${clientUrl}/login?error=server_error`);
    }
};

export const getMe = async (req, res) => {
    const user = req.user;

    res.status(200).json({
        message: "User fetched successfully",
        success: true,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role
        }
    })
}

export const logout = async (req, res) => {
    const isProd = config.NODE_ENV === "production";
    res.clearCookie("token", {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        path: "/"
    });
    return res.status(200).json({
        message: "Logged out successfully",
        success: true
    });
};