import axios from "axios"

const fetchDishes = () => {
  return axios.get("http://localhost:3000/dishes")
}
const DishesService ={
  fetchDishes,
}
export default DishesService