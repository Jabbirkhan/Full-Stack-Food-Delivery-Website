import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        index: true
    },
    password:{
        type: String,
        default: null
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    verifyOtp: {
        type: String,
        default: ''
    },
    verifyOtpExpiresAt: {
        type: Date,
        default: null
    },
    verifyResetOtp: {
        type: String,
        default: ''
    },
    resetOtpExpiresAt: {
        type: Date,
        default: null
    }
},{timestamps: true});

export const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);