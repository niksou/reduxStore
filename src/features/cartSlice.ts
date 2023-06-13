import { createSlice } from '@reduxjs/toolkit'
import IItem from '../Models/IItem'

const initialState: IItem[] = []

export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        set:(state,action)=>{
            return action.payload
        },

        addItem:(state,action)=>{

            const {id,name,price} = action.payload
            if(state.find((item)=>item.dish_id === id)) {
                return state.map((item)=>
                    item.dish_id === id ? {...item,amount:item.amount + 1} : item
                )
            } else{
                state.push({
                    dish_id:id,
                    dish_name:name,
                    dish_price:price,
                    amount:1
                })
                console.log(state)
            }
        },
        removeItem:(state,action) =>{
            return state.filter(dish=>dish.dish_id !== action.payload)
        },
        removeAll:(state,action)=>{
            return []
        }
    }
})
export const CartActions = cartSlice.actions
export default cartSlice.reducer