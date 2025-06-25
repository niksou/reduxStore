import axios from "axios"
import IItem from "../Models/IItem";

const createOrder = (cart: IItem[]) => {
    console.log('📝 OrderService: Starting order creation');
    console.log('🛒 OrderService: Cart items to order:', cart);
    console.log('📊 OrderService: Number of items:', cart.length);
    
    const totalValue = cart.reduce((sum, item) => sum + (item.dish_price * item.amount), 0);
    console.log('💵 OrderService: Total order value:', totalValue);
    
    const orderData = { items: cart };
    console.log('📦 OrderService: Order payload:', orderData);
    console.log('🌐 OrderService: Request URL: http://localhost:3000/orders');
    
    return axios.post("http://localhost:3000/orders", orderData)
        .then(response => {
            console.log('✅ OrderService: Order created successfully');
            console.log('📊 OrderService: Response status:', response.status);
            console.log('🎯 OrderService: Order response:', response.data);
            return response;
        })
        .catch(error => {
            console.error('❌ OrderService: Failed to create order');
            console.error('🚨 OrderService: Error details:', error.message);
            console.error('📡 OrderService: Request failed for URL: http://localhost:3000/orders');
            console.error('📦 OrderService: Failed payload:', orderData);
            throw error;
        });
}

const OrderService = { createOrder }

export default OrderService