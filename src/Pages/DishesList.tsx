import React, { useEffect, useState } from "react"
import IDish from "../Models/IDish";
import DishesService from "../Services/Dish.service"
import { Link } from "react-router-dom"
//import { Table, TableBody, TableHead, TableCell, TableRow } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import {CartActions} from "../features/cartSlice";
import { Card,CardMedia,CardHeader,CardActions,Button } from '@mui/material'

function DishesList() {
    const dispatch = useDispatch()
    const [dishes,setDishes] = useState<IDish[]>([])
    
    useEffect(() => {
        console.log('🍽️ DishesList component mounted');
        fetchDishes()
    }, [])
    
    async function fetchDishes() {
        console.log('📡 Fetching dishes from API...');
        try {
            const response: any = await DishesService.fetchDishes()
            console.log('✅ Successfully fetched dishes:', response.data);
            console.log('💾 Caching dishes to localStorage');
            localStorage.setItem("cache", JSON.stringify(response.data))
            setDishes(response.data)
            //dispatch(ProductActions.set(response.data))
        } catch (error) {
            console.error('❌ Failed to fetch dishes from API:', error);
            console.log('🔄 Attempting to load from cache...');
            const c = JSON.parse(localStorage.getItem("cache") || "[]")
            console.log('📦 Loaded dishes from cache:', c);
            setDishes(c)
            //dispatch(ProductActions.set(c))
        }
    }

    const handleAddToCart = (dish: IDish) => {
        console.log('🛒 Adding dish to cart:', dish);
        dispatch(CartActions.addItem(dish));
        console.log('✅ Dish added to cart successfully');
    };

    console.log('🔄 DishesList render - Current dishes count:', dishes.length);

    return (
        <div>
            <ul>
                {
                    dishes.map((dish, index) => {
                        console.log(`🍽️ Rendering dish ${index + 1}:`, dish.name);
                        return (
                            <Card key={dish.id}>
                                <CardHeader title={dish.name} subheader={dish.price+' ש"ח'}/>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={dish.imageUrl}
                                />
                                <CardActions>
                                    <Button variant="outlined" onClick={() => handleAddToCart(dish)}>
                                        Add to cart
                                    </Button>
                                </CardActions>
                            </Card>
                        )
                    })
                }
            </ul>
        </div>
    );
}
export default DishesList
