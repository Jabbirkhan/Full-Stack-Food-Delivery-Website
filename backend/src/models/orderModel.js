import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        index:true
    },
    items:{
        type:Array,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    status:{
        type: String,
        required: true,
        default:'Order Placed'
    },
    paymentMethod:{
        type:String,
        required:true
    },
    payment:{
        type: Boolean,
        default: false,
        required:true,
    },
    idempotencyKey: {
        type: String,
        required: function () {
            return this.paymentMethod === "stripe";
        }, // This field is required only for Stripe payments
    },
},{timestamps:true});

orderSchema.index(
  { userId: 1, idempotencyKey: 1 },
  {
    unique: true,
    partialFilterExpression: {
      idempotencyKey: { $type: "string" },
    },
  }
);

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);