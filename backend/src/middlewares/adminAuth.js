import jwt from "jsonwebtoken";
import { Admin } from "./../models/adminModel.js";

const adminAuth = async (req, res, next) => {
    try {
        let token;
        if(req.cookies?.foodDeliveryAdminToken){
            token = req.cookies.foodDeliveryAdminToken;
        }
        if(!token){
            return res.status(401).json({success: false, message: 'Unauthorized'});
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decodedToken.id).select("-password");
        req.admin = admin
        next();
    } catch (error) {
        return res.status(401).json({success: false, message: 'Unauthorized'});
    }
}

export default adminAuth;