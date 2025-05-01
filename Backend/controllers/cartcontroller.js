const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {CartItem, Product } = require('../Models');

exports.HandleCart = async (req, res) => {
    try {
        const {userId, productId, quantity} = req.body;
        console.log("Create cart request received:", req.body);

        // Check that the product does exist
        const productExist = await Product.findByPk(productId);
        if (!productExist) {
            return res.status(404).json({ message: 'Product not found' });
        }

        //check if the item is already in that user's cart

        let itemAlreadyinCart = await CartItem.findOne({
            where: {
                user_id: userId,
                product_id: productId
            }
        });
        if (itemAlreadyinCart) {
            console.log("Item already in cart. Updating quantity.");
            itemAlreadyinCart.quantity += quantity;
            await itemAlreadyinCart.save();
            return res.status(200).json({ message: 'Cart updated successfully', cart: itemAlreadyinCart });
        }else{
            if (quantity <= 0) {
                return res.status(400).json({ message: 'Quantity must be greater than zero in order to make Cart' });
            } else {
                // Create a new cart item if it doesn't exist
                console.log("Creating new cart item");
                const cart = await CartItem.create({
                    user_id: userId,
                    product_id: productId,
                    quantity: quantity
                });
                res.status(201).json({ message: 'Cart created successfully', cart });
            }
        } 
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        
    }
}


exports.GetCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log("Get cart request received for user:", userId);

        const cartItems = await CartItem.findAll({
            where: {
                user_id: userId
            },
            include: [{
                model: Product,
                as: 'product',
                attributes: ['productId','productName','price','image']
            },],
        });

        const cartSummary = cartItems.map(item => ({
                productId: item.product.productId,
                image: item.product.image,
                productName: item.product.productName,
                price: item.product.price,
                quantity: item.quantity,
                totalPrice: item.quantity * item.product.price
            }));
        res.status(200).json(cartSummary);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// exports.removeFromCart = async (req, res) => {
//     const { cart_id } = req.body;
  
//     try {
//       const cartItem = await Cart.findByPk(cart_id);
//       if (!cartItem) return res.status(404).json({ message: "Cart item not found" });
  
//       await cartItem.destroy();
//       res.json({ message: "Item removed from cart" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Error removing from cart" });
//     }
//   };