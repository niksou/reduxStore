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

    const handleOrderClick = async () => {
        await OrderService.createOrder(items);
        navigate('/')
        dispatch(CartActions.removeAll(items))

    };

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
                        items.map((item:IItem)=>(
                            <TableRow>
                                <TableCell>{item.dish_name}</TableCell>
                                <TableCell>{item.dish_price}</TableCell>
                                <TableCell>{item.amount}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" onClick={()=>dispatch(CartActions.removeItem(item.dish_id))}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
        </TableContainer>
    <Button variant="contained" onClick={handleOrderClick}>Order</Button>
        </>
    )
}
export default Cart