import { createSlice } from '@reduxjs/toolkit'
import IItem from '../Models/IItem'

const initialState: IItem[] = []

export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        set:(state,action)=>{
            console.log('🔄 Redux: Setting cart state', action.payload);
            return action.payload
        },

        addItem:(state,action)=>{
            const {id,name,price} = action.payload
            console.log('➕ Redux: Adding item to cart', {id, name, price});
            
            const existingItem = state.find((item)=>item.dish_id === id);
            
            if(existingItem) {
                console.log('📈 Redux: Item already exists, incrementing amount', existingItem);
                return state.map((item)=>
                    item.dish_id === id ? {...item,amount:item.amount + 1} : item
                )
            } else{
                const newItem = {
                    dish_id:id,
                    dish_name:name,
                    dish_price:price,
                    amount:1
                };
                console.log('🆕 Redux: Adding new item to cart', newItem);
                state.push(newItem);
                console.log('🛒 Redux: Updated cart state', state);
            }
        },
        removeItem:(state,action) =>{
            console.log('🗑️ Redux: Removing item from cart', action.payload);
            const filteredState = state.filter(dish=>dish.dish_id !== action.payload);
            console.log('🛒 Redux: Cart state after removal', filteredState);
            return filteredState;
        },
        removeAll:(state,action)=>{
            console.log('🧹 Redux: Clearing entire cart');
            return []
        }
    }
})
export const CartActions = cartSlice.actions
export default cartSlice.reducer