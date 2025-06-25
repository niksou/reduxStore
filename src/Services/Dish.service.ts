import axios from "axios"

const fetchDishes = () => {
    console.log('📡 DishService: Starting API call to fetch dishes');
    console.log('🌐 DishService: Request URL: http://localhost:3000/dishes');
    
    return axios.get("http://localhost:3000/dishes")
        .then(response => {
            console.log('✅ DishService: Successfully fetched dishes');
            console.log('📊 DishService: Response status:', response.status);
            console.log('📋 DishService: Number of dishes received:', response.data?.length || 0);
            console.log('🍽️ DishService: Dishes data:', response.data);
            return response;
        })
        .catch(error => {
            console.error('❌ DishService: Failed to fetch dishes');
            console.error('🚨 DishService: Error details:', error.message);
            console.error('📡 DishService: Request failed for URL: http://localhost:3000/dishes');
            throw error;
        });
}

const DishesService = {
    fetchDishes,
}

export default DishesService