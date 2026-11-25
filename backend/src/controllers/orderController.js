import { Order } from "./../models/orderModel.js";
import { User } from "./../models/userModel.js";
import { Product } from "./../models/productModel.js";
// 1. Import the Stripe library
import Stripe from "stripe";

// 2. stripe initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173"; // Replace with your frontend URL

// global variables
const currency = 'USD'
const deliveryCharge = 20

const placeOrder = async (req, res) => {
  try {
    const id = req.user._id;
    const { items, address, amount, paymentMethod } = req.body;

    if (!items || !address || !amount || !paymentMethod) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const orderData = {
      userId: id,
      items,
      address,
      amount,
      paymentMethod,
      payment: false,
      status: "Order Placed",
    };

    const order = await Order.create(orderData);
    await order.save();

    await User.findByIdAndUpdate(id, { cartData: {} }); // After successfull order, we empty the user cart

    return res
      .status(200)
      .json({ success: true, message: "Order Placed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createStripeSession = async (order) => {
  const line_items = order.map((item) => {
      const selectedPrice =
        item.size === "Half"
          ? item.price[0]
          : item.price[item.price.length - 1];

      return {
        price_data: {
          currency,
          product_data: {
            name: `${item.name} (${item.size})`,
          },
          unit_amount: Math.round(Number(selectedPrice) * 100),
        },
        quantity: item.quantity,
      };
    });

  line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: deliveryCharge * 100, // Stripe requires amount in cents
      },
      quantity: 1,
    })

  return stripe.checkout.sessions.create(
    {
      mode: "payment",
      line_items,
      success_url: `${frontendUrl}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${frontendUrl}/verify?canceled=true&orderId=${order._id}`,
      // Metadata for the Checkout Session.
      metadata: {
        orderId: order._id.toString(),
        userId: req.user._id.toString(),
      },
      // Metadata for the PaymentIntent used by our webhook.
      payment_intent_data: {
        metadata: {
          orderId: order._id.toString(),
          userId: req.user._id.toString(),
        },
      },
    },
    {
      idempotencyKey: `checkout-session-${order._id}`,
    }
  );
};

const placeStripeOrder = async (req, res) => {
  try {
    const userId = req.user._id
    const { items, address, amount, paymentMethod, idempotencyKey } = req.body;

    if (!Array.isArray(items) || !items.length || !address || !amount || !paymentMethod) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!idempotencyKey) {
      return res.status(400).json({ success: false, message: "A valid idempotency UUID is required" });
    }

    const existingOrder = await Order.findOne({
      userId,
      idempotencyKey,
    });

    if (existingOrder) {
      const session = await createStripeSession(existingOrder);
      return res.status(200).json({ success: true, session_url: session.url });
    }

    let TotalAmount = 0;
    const productData = [];
    for (const item of items) {
      const product = await Product.findById(item._id);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      const quantity = Number(item.quantity);
      if (!Number.isSafeInteger(quantity) || quantity < 1) {
        return res.status(400).json({ success: false, message: "Invalid product quantity" });
      }

      const price = product.price;
      if (!Number.isFinite(price) || price < 0) {
        return res.status(400).json({ success: false, message: "Invalid product price" });
      }

      TotalAmount += price * quantity;

      productData.push({
        productId: product._id,
        name: product.name,
        size: item.size,
        quantity,
        price,
      });
    }
    // Add delivery charges on the backend.
    TotalAmount += deliveryCharge;

    const orderData = {
      userId: id,
      items: productData,
      address,
      amount: TotalAmount,
      paymentMethod,
      idempotencyKey,
      date: Date.now(),
    }

    const order = await Order.create(orderData);
    await order.save();

    const session = await createStripeSession(order);

    return res.status(200).json({ success: true, session_url: session.url });

  } catch (error) {
    if (error.code === 11000 && idempotencyKey) {
      const userId = req.user._id;
      const existingOrder = await Order.findOne({
        userId,
        idempotencyKey,
      });

      if (existingOrder) {
        try {
          const session = await createStripeSession(existingOrder);
          return res.status(200).json({ success: true, session_url: session.url });
        } catch (sessionError) {
          console.error("Stripe session retry failed:", sessionError);
        }
      }
    }

    res.status(500).json({ success: false, message: error.message });
  }
}

const handlePaymentIntent = async (paymentIntentId, payment) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  const { orderId, userId } = paymentIntent.metadata;
  if (!orderId || !userId) {
    return res.json({ success: false, message: "Payment metadata is missing" });
  }
  const order = await Order.findOne({
    _id: orderId,
    userId,
  });
  if (!order) {
    return res.json({ success: false, message: "Order not found" });
  }
  // Never mark an order paid unless Stripe confirms it.
  if (payment && paymentIntent.status !== "succeeded") {
    return res.json({ success: false, message: "Payment is not successfull" });
  }
  if (payment && (paymentIntent.currency !== currency || paymentIntent.amount_received !== Math.round(order.amount * 100))) {
    return res.json({ success: false, message: "Payment amount or currency mismatch" });
  }
  // Never downgrade a paid order.
  if (order.payment) {
    return;
  }
  order.payment = payment;
  await order.save();
};

const stripeWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"]; // we get the signature when stripe send post request

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Invalid Stripe webhook:", error.message);
    return res.status(400).send("Invalid webhook signature");
  }
  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentIntent(event.data.object.id, true);
        break;
      case "payment_intent.payment_failed":
      case "payment_intent.canceled":
        await handlePaymentIntent(event.data.object.id, false);
        break;
      default:
        break;
    }
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing error:", error);
    // Stripe can retry events after a server error.
    return res.status(500).json({ received: false });
  }
};

// 7. Verify the payment
const verifyStripeOrder = async (req, res) => {
  try {
    const { orderId } = req.query;
    const userId = req.user._id;

    const order = await Order.findOne({
      _id: orderId,
      userId,
    });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (!order.payment) {
      return res.status(200).json({ success: false, payment: false, message: "Payment is pending confirmation. Please check again shortly." });
    }
    // Clear the cart only after confirmed payment.
    await User.findByIdAndUpdate(userId, {
      cartData: {},
    });

    return res.status(200).json({ success: true, payment: true, message: "Payment successful and order placed" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const userOrder = async (req, res) => {
  try {
    const id = req.user._id;
    const userOrder = await Order.find({ userId: id });
    return res.status(200).json({ success: true, userOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const ordersList = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      return res
        .status(404)
        .json({ success: false, message: "No order found" });
    }
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // if satatus is "Delivered" then we will update the payment status to true
    if (status === "Delivered") {
      await Order.findByIdAndUpdate(id, { status, payment: true });
      return res
        .status(200)
        .json({
          success: true,
          message: "Order Delivered and Payment Completed",
        });
    }

    // For other status updates, we just update the status
    await Order.findByIdAndUpdate(id, { status });
    res.status(200).json({ success: true, message: "Status Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// admin can update statsus automatically and it run every 1 hour
const autoStatusUpdate = async () => {
  try {
    const orders = await Order.find({ status: { $ne: "Delivered" } }); // Find orders that are not yet delivered

    const currentDate = new Date();
    for (const order of orders) {
      const orderDate = new Date(order.createdAt);
      const timeDiff = currentDate - orderDate;
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      if (daysDiff >= 7 && order.status !== "Delivered") {
        await Order.findByIdAndUpdate(order._id, { status: "Delivered", payment: true });
      }
    }

    // After delivery, we delete the order after 1 day
    for (const order of orders) {
      if (order.status === "Delivered") {
        setTimeout(async () => {
          await Order.findByIdAndDelete(order._id);
        }, 1 * 24 * 60 * 60 * 1000,
        ); // 1 day in milliseconds
      }
    }

    return res.status(200).json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { placeOrder, userOrder, ordersList, updateStatus, autoStatusUpdate, placeStripeOrder, verifyStripeOrder, stripeWebhook };
