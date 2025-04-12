import express from "express";
import MenuItem from "../models/dishes.model.js";

const router = express.Router();

router.get("/dishes", (req, res) => {
  console.log("Fetching menu items...");
  MenuItem.find()
    .then((menuItems) => {
      res.status(200).json({
        success: true,
        menuItems,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error: "Failed to fetch menu items",
      });
    });
});

router.get("/seed", (req, res) => {
  MenuItem.insertMany([
    // Starters
    {
      name: "Tandoori Chicken",
      description: "Marinated chicken cooked in a clay oven with royal spices",
      price: "₹189.9",
      image:
        "https://images.pexels.com/photos/995735/pexels-photo-995735.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Starters",
    },
    {
      name: "Paneer Tikka",
      description: "Grilled cottage cheese with bell peppers and onions",
      price: "₹159.9",
      image:
        "https://images.pexels.com/photos/20004800/pexels-photo-20004800/free-photo-of-asian-soup-served-in-a-restaurant.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Starters",
    },
    {
      name: "Hara Bhara Kebab",
      description:
        "Spiced spinach and pea patties, shallow-fried to perfection",
      price: "₹139.9",
      image:
        "https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Starters",
    },
    {
      name: "Amritsari Fish",
      description: "Crispy fried fish with aromatic Punjabi spices",
      price: "₹179.9",
      image:
        "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Starters",
    },
    {
      name: "Chicken Seekh Kebab",
      description: "Minced chicken skewers grilled with fragrant spices",
      price: "₹169.9",
      image:
        "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Starters",
    },
    {
      name: "Veg Spring Rolls",
      description: "Crispy rolls stuffed with spiced vegetables",
      price: "₹129.9",
      image:
        "https://images.pexels.com/photos/3023472/pexels-photo-3023472.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Starters",
    },

    // Main Course
    {
      name: "Dal Makhani",
      description: "Black lentils simmered with cream and butter",
      price: "₹149.9",
      image:
        "https://images.pexels.com/photos/2175211/pexels-photo-2175211.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Main Course",
    },
    {
      name: "Rogan Josh",
      description: "Slow-cooked lamb in a rich spiced gravy",
      price: "₹219.9",
      image:
        "https://images.pexels.com/photos/958546/pexels-photo-958546.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Main Course",
    },
    {
      name: "Butter Chicken",
      description: "Tender chicken in a creamy tomato sauce",
      price: "₹199.9",
      image:
        "https://images.pexels.com/photos/20004800/pexels-photo-20004800/free-photo-of-asian-soup-served-in-a-restaurant.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Main Course",
    },
    {
      name: "Prawn Masala",
      description: "Succulent prawns in a fiery coastal curry",
      price: "₹229.9",
      image:
        "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Main Course",
    },
    {
      name: "Palak Paneer",
      description: "Cottage cheese cubes in a creamy spinach gravy",
      price: "₹169.9",
      image:
        "https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Main Course",
    },
    {
      name: "Mutton Korma",
      description: "Tender mutton in a rich almond and yogurt curry",
      price: "₹239.9",
      image:
        "https://images.pexels.com/photos/7353380/pexels-photo-7353380.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Main Course",
    },

    // Breads
    {
      name: "Butter Naan",
      description: "Soft flatbread brushed with ghee and herbs",
      price: "₹49.9",
      image:
        "https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Breads",
    },
    {
      name: "Garlic Naan",
      description: "Fluffy naan topped with garlic and coriander",
      price: "₹59.9",
      image:
        "https://images.pexels.com/photos/3434523/pexels-photo-3434523.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Breads",
    },
    {
      name: "Stuffed Kulcha",
      description: "Naan stuffed with spiced paneer and herbs",
      price: "₹69.9",
      image:
        "https://images.pexels.com/photos/2144200/pexels-photo-2144200.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Breads",
    },
    {
      name: "Tandoori Roti",
      description: "Whole wheat bread baked in a clay oven",
      price: "₹39.9",
      image:
        "https://images.pexels.com/photos/1410236/pexels-photo-1410236.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Breads",
    },

    // Desserts
    {
      name: "Gulab Jamun",
      description: "Soft milk dumplings soaked in saffron syrup",
      price: "₹99.9",
      image:
        "https://images.pexels.com/photos/4045508/pexels-photo-4045508.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Desserts",
    },
    {
      name: "Rasmalai",
      description: "Spongy paneer balls in thickened milk with cardamom",
      price: "₹119.9",
      image:
        "https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Desserts",
    },
    {
      name: "Shahi Tukda",
      description: "Fried bread soaked in rabri with pistachios",
      price: "₹129.9",
      image:
        "https://images.pexels.com/photos/2878738/pexels-photo-2878738.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Desserts",
    },
    {
      name: "Kheer",
      description: "Creamy rice pudding with nuts and saffron",
      price: "₹109.9",
      image:
        "https://images.pexels.com/photos/5688059/pexels-photo-5688059.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Desserts",
    },

    // Beverages
    {
      name: "Mango Lassi",
      description: "Sweet yogurt drink blended with fresh mangoes",
      price: "₹89.9",
      image:
        "https://images.pexels.com/photos/5947063/pexels-photo-5947063.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Beverages",
    },
    {
      name: "Masala Chai",
      description: "Spiced tea brewed with aromatic herbs",
      price: "₹49.9",
      image:
        "https://images.pexels.com/photos/312420/pexels-photo-312420.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Beverages",
    },
    {
      name: "Nimbu Pani",
      description: "Refreshing lemon water with a hint of spices",
      price: "₹39.9",
      image:
        "https://images.pexels.com/photos/161616/pexels-photo-161616.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Beverages",
    },

    // Rice & Biryani
    {
      name: "Chicken Biryani",
      description: "Fragrant rice with tender chicken and spices",
      price: "₹199.9",
      image:
        "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Rice & Biryani",
    },
    {
      name: "Veg Pulao",
      description: "Spiced rice with mixed vegetables",
      price: "₹139.9",
      image:
        "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Rice & Biryani",
    },
    {
      name: "Mutton Biryani",
      description: "Rich rice layered with succulent mutton",
      price: "₹249.9",
      image:
        "https://images.pexels.com/photos/16274438/pexels-photo-16274438/free-photo-of-indian-food.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Rice & Biryani",
    },
  ])
    .then(() => {
      res.status(200).json({ message: "Menu items seeded successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to seed menu items" });
    });
});

router.post("/dishes", (req, res) => {
  const { name, description, price, image, category } = req.body;
  const menuItem = new MenuItem({
    name,
    description,
    price,
    image,
    category,
  });
  menuItem
    .save()
    .then((savedMenuItem) => {
      res.status(201).json({
        success: true,
        menuItem: savedMenuItem,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to save menu item" });
    });
});

export default router;
