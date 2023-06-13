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
        fetchDishes()
    }, [])
    async function fetchDishes() {
        try {
            const response: any = await DishesService.fetchDishes()
            localStorage.setItem("cache", JSON.stringify(response.data))
            setDishes(response.data)
            //dispatch(ProductActions.set(response.data))
        } catch (error) {
            const c = JSON.parse(localStorage.getItem("cache") || "[]")
            setDishes(c)
            //dispatch(ProductActions.set(c))
        }
    }

    return (
        <div>
            <ul>
                {
                    dishes.map(dish=>(
                        <Card>
                            <CardHeader title={dish.name} subheader={dish.price+' ש"ח'}/>
                            <CardMedia
                                component="img"
                                height="194"
                                image={dish.imageUrl}
                            />
                            <CardActions>
                                <Button variant="outlined" onClick={()=>dispatch(CartActions.addItem(dish))}>
                                    Add to cart
                                </Button>
                            </CardActions>
                        </Card>
                    ))
                }
            </ul>
        </div>
    );
}
export default DishesList
