import axios from "axios"
import IItem from "../Models/IItem";

const createOrder = (cart:IItem[]) => {
    return axios.post("http://localhost:3000/orders",{items:cart})
}
const OrderService ={createOrder}

export default OrderService