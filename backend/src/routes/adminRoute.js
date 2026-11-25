import { Router } from "express";
import { adminLogin, adminRegister, logoutAdmin, resetPassword, sendResetPasswordOtp, verifyAdmin, verifyResetPasswordOtp } from "../controllers/adminControllers.js";
import adminAuth from "./../middlewares/adminAuth.js";
import upload from "./../middlewares/multer.js";
import { deleteProduct, productList, updateAvailability, updateProduct, uploadProduct } from "../controllers/productController.js";
import { autoStatusUpdate, ordersList, updateStatus } from "../controllers/orderController.js";

const adminRouter = Router();

adminRouter.route('/register').post(adminRegister);
adminRouter.route('/login').post(adminLogin);
adminRouter.route('/verify').get(adminAuth, verifyAdmin);
adminRouter.route('/logout').post(logoutAdmin);

adminRouter.route('/send-reset-password-otp').post(sendResetPasswordOtp);
adminRouter.route('/verify-reset-password-otp').post(verifyResetPasswordOtp);
adminRouter.route('/reset-password').post(resetPassword);

adminRouter.route('/addproduct').post(adminAuth, upload.single("image"), uploadProduct);
adminRouter.route('/allproducts').get(adminAuth, productList);
adminRouter.route('/updateproduct/:id').patch(adminAuth, upload.single("image"), updateProduct);
adminRouter.route('/update-availability/:id').patch(adminAuth, updateAvailability);
adminRouter.route('/deleteproduct/:id').delete(adminAuth, deleteProduct);

adminRouter.route('/orders').get(adminAuth, ordersList);
adminRouter.route('/updatestatus/:id').patch(adminAuth, updateStatus);
adminRouter.route('/autostatusupdate').patch(adminAuth, autoStatusUpdate);

export default adminRouter;