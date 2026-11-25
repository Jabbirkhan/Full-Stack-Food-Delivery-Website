import { Router } from "express";
import {
    getProfile, handleGithubCallback, handleGoogleCallback, resetPassword, sendContactMessage,
    sendResetPasswordOtp, userLogin, userLogout, userRegistration, userVerify, verifyResetPasswordOtp
} from "../controllers/userControllers.js";
import passport from "passport";
import { productList } from "../controllers/productController.js";
import { addToCart, updateCart, userCart } from "../controllers/cartController.js";
import { placeOrder, placeStripeOrder, userOrder, verifyStripeOrder } from "../controllers/orderController.js";
import userAuth from "./../middlewares/userAuth.js";

const userRouter = Router();

userRouter.route('/register').post(userRegistration);
userRouter.route('/login').post(userLogin);
userRouter.route('/verify').get(userAuth, userVerify);
userRouter.route('/logout').post(userLogout);
userRouter.route('/profile').get(userAuth, getProfile);

userRouter.route('/send-reset-password-otp').post(sendResetPasswordOtp);
userRouter.route('/verify-reset-password-otp').post(verifyResetPasswordOtp);
userRouter.route('/reset-password').post(resetPassword);

userRouter.route("/send-contact-message").post(userAuth, sendContactMessage);

userRouter.route('/allproducts').get(userAuth, productList);

userRouter.route('/addtocart').post(userAuth, addToCart);
userRouter.route('/updatecart').patch(userAuth, updateCart);
userRouter.route('/cart').get(userAuth, userCart);

userRouter.route('/placeorder').post(userAuth, placeOrder);
userRouter.route('/placestripeorder').post(userAuth, placeStripeOrder);
userRouter.route('/verifystripeorder').post(userAuth, verifyStripeOrder);
userRouter.route('/orders').get(userAuth, userOrder);

// // Google and GitHub authentication routes (for production, without state parameter)
userRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
userRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// Callback routes for Google and GitHub authentication
userRouter.get('/google/callback', passport.authenticate('google', { session: false}), handleGoogleCallback);
userRouter.get('/github/callback', passport.authenticate('github', { session: false}), handleGithubCallback);

export default userRouter;