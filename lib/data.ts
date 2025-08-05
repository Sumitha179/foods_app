const dummyData = {
    categories: [
        { name: "Burgers", description: "Juicy grilled burgers" },
        { name: "Pizzas", description: "Oven-baked cheesy pizzas" },
        { name: "Burritos", description: "Rolled Mexican delights" },
        { name: "Sandwiches", description: "Stacked and stuffed sandwiches" },
        { name: "Wraps", description: "Rolled up wraps packed with flavor" },
        { name: "Bowls", description: "Balanced rice and protein bowls" },
    ],

    customizations: [
        // Toppings
        { name: "Extra Cheese", price: 25, type: "topping" },
        { name: "Jalapeños", price: 20, type: "topping" },
        { name: "Onions", price: 10, type: "topping" },
        { name: "Olives", price: 15, type: "topping" },
        { name: "Mushrooms", price: 18, type: "topping" },
        { name: "Tomatoes", price: 10, type: "topping" },
        { name: "Bacon", price: 30, type: "topping" },
        { name: "Avocado", price: 35, type: "topping" },

        // Sides
        { name: "Coke", price: 30, type: "side" },
        { name: "Fries", price: 35, type: "side" },
        { name: "Garlic Bread", price: 40, type: "side" },
        { name: "Chicken Nuggets", price: 50, type: "side" },
        { name: "Iced Tea", price: 28, type: "side" },
        { name: "Salad", price: 33, type: "side" },
        { name: "Potato Wedges", price: 38, type: "side" },
        { name: "Mozzarella Sticks", price: 45, type: "side" },
        { name: "Sweet Corn", price: 25, type: "side" },
        { name: "Choco Lava Cake", price: 42, type: "side" },
    ],

    menu: [
        {
                name: "Classic Cheeseburger",
                description: "Beef patty, cheese, lettuce, tomato",
                image_url: "6891ab8e001db96a3d1f", // ✅ File ID from Appwrite
                price: 250,
                rating: 4.5,
                calories: 550,
                protein: 25,
                category_name: "Burgers",
                customizations: ["Extra Cheese", "Coke", "Fries", "Onions", "Bacon"],
        },

        {
                name: "Pepperoni Pizza",
                description: "Loaded with cheese and pepperoni slices",
                image_url: "6891abf5000309c3edbb", // ✅ Appwrite File ID
                price: 300,
                rating: 4.7,
                calories: 700,
                protein: 30,
                category_name: "Pizzas",
                customizations: [
                    "Extra Cheese",
                    "Jalapeños",
                    "Garlic Bread",
                    "Coke",
                    "Olives",
                ],
        },

        {
                name: "Paneer Tikka Wrap",
                description: "Spicy paneer, mint chutney, veggies",
                image_url: "6891abb5001ff52a2569", // ✅ Appwrite File ID
                price: 160,
                rating: 4.6,
                calories: 470,
                protein: 20,
                category_name: "Wraps",
                customizations: ["Jalapeños", "Tomatoes", "Salad", "Fries", "Iced Tea"],
        },


        {
                name: "Mexican Burrito Bowl",
                description: "Rice, beans, corn, guac, salsa",
                image_url: "6891abc700282440fbb2", // ✅ Appwrite File ID
                price: 230,
                rating: 4.7,
                calories: 610,
                protein: 24,
                category_name: "Bowls",
                customizations: ["Avocado", "Sweet Corn", "Salad", "Iced Tea"],

        },
        {
            
                name: "Spicy Chicken Sandwich",
                description: "Crispy chicken, spicy sauce, pickles",
                image_url: "6891abda0007254d23e4", // ✅ Appwrite File ID
                price: 240,
                rating: 4.3,
                calories: 540,
                protein: 26,
                category_name: "Sandwiches",
                customizations: [
                    "Jalapeños",
                    "Onions",
                    "Fries",
                    "Coke",
                    "Choco Lava Cake",
                ],


        },
        {
            
                name: "Chicken Caesar Wrap",
                description: "Grilled chicken, lettuce, Caesar dressing",
                image_url: "6891abfd0039bbdc3600", // ✅ Appwrite File ID
                price: 220,
                rating: 4.4,
                calories: 490,
                protein: 28,
                category_name: "Wraps",
                customizations: ["Extra Cheese", "Coke", "Potato Wedges", "Tomatoes"],


        },

       
       


    ],                                                                 
    
};

export default dummyData;
