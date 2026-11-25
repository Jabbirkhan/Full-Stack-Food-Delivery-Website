import { User } from "./../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const id = req.user._id;
    const { itemId, size } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = user.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await User.findByIdAndUpdate(id, { cartData });
    return res.status(200).json({ success: true, message: "Product is added to cart" });
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

const updateCart = async (req, res) => {
  try {
    const id = req.user._id;
    const { itemId, size, quantity } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = user.cartData || {}

    if (quantity <= 0) {
      delete cartData[itemId][size]
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }
    await User.findByIdAndUpdate(id, { cartData });
    return res.status(200).json({ success: true, message: "Cart is updated" });
  } catch (error) {
    res
      .status(500).json({ success: false, message: error.message });
  }
};

const userCart = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const cartData = user.cartData || {}
    // if (Object.keys(cartData).length === 0) {
    //   return res.status(400).json({ success: false, message: "Cart is empty" });
    // }
    return res.status(200).json({ success: true, cartData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, userCart };


