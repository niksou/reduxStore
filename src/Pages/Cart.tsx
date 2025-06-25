import React, { useEffect, useState } from "react"
import IItem from "../Models/IItem";
import { useSelector, useDispatch } from "react-redux"
import {CartActions} from "../features/cartSlice";
import {TableContainer,Table,Paper,TableCell,TableRow,TableBody,TableHead,Button} from '@mui/material'
import OrderService from '../Services/Order.service'
import {useNavigate} from "react-router-dom";


function Cart(){
    const [cartItems,setCartItems] = useState<IItem[]>([])
    const items:IItem[] = useSelector((state:any)=>state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('🛒 Cart component mounted');
        console.log('📊 Current cart items:', items);
    }, []);

    useEffect(() => {
        console.log('🔄 Cart items updated:', items);
        console.log('💰 Total items in cart:', items.length);
        const totalValue = items.reduce((sum, item) => sum + (item.dish_price * item.amount), 0);
        console.log('💵 Total cart value:', totalValue);
    }, [items]);

    const handleOrderClick = async () => {
        console.log('📝 Processing order...');
        console.log('🛒 Order items:', items);
        
        try {
            console.log('📡 Sending order to server...');
            await OrderService.createOrder(items);
            console.log('✅ Order created successfully');
            console.log('🧭 Navigating to home page');
            navigate('/');
            console.log('🧹 Clearing cart');
            dispatch(CartActions.removeAll(items));
        } catch (error) {
            console.error('❌ Failed to create order:', error);
        }
    };

    const handleRemoveItem = (dishId: number) => {
        console.log('🗑️ Removing item from cart, dish ID:', dishId);
        dispatch(CartActions.removeItem(dishId));
    };

    console.log('🔄 Cart render - Items count:', items.length);

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            items.map((item:IItem, index) => {
                                console.log(`🍽️ Rendering cart item ${index + 1}:`, item.dish_name);
                                return (
                                    <TableRow key={item.dish_id}>
                                        <TableCell>{item.dish_name}</TableCell>
                                        <TableCell>{item.dish_price}</TableCell>
                                        <TableCell>{item.amount}</TableCell>
                                        <TableCell>
                                            <Button variant="outlined" onClick={() => handleRemoveItem(item.dish_id)}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" onClick={handleOrderClick}>Order</Button>
        </>
    )
}
export default Cart