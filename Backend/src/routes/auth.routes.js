import { Router } from "express";
import { validateRegisterUser, validateLoginUser } from "../validator/auth.validator.js";
import { getMe, googleCallback, login, register, logout } from "../controllers/auth.controller.js";
import passport from "passport";
import { config } from "../config/config.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = Router();



router.post('/register', validateRegisterUser, register)

router.post("/login", validateLoginUser, login)

router.get("/logout", logout);
router.post("/logout", logout);


// /api/auth/google
router.get("/google", (req, res, next) => {
    const role = req.query.role || "buyer";
    passport.authenticate("google", { scope: [ "profile", "email" ], state: role })(req, res, next);
})

router.get("/google/callback", (req, res, next) => {
    passport.authenticate("google", { session: false }, (err, user, info) => {
        const clientUrl = config.CLIENT_URL || process.env.CLIENT_URL || "http://localhost:5173";
        if (err || !user) {
            console.error("Passport Google Auth Error Details:", err || info);
            const errCode = err?.code || err?.message || "google_auth_failed";
            return res.redirect(`${clientUrl}/login?error=${encodeURIComponent(errCode)}`);
        }
        req.user = user;
        return googleCallback(req, res, next);
    })(req, res, next);
});


/**
 * @route GET /api/auth/me
 * @description Get the authenticated user's profile
 * @access Private
 */
router.get('/me', authenticateUser, getMe)

export default router;