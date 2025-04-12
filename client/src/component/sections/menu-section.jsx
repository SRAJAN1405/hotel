import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const menuItems = [
  {
    id: 1,
    name: "Tandoori Chicken",
    description: "Marinated chicken cooked in clay oven with special spices",
    price: "₹189.9",
    image:
      "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Paneer Tikka",
    description: "Grilled cottage cheese with bell peppers and onions",
    price: "₹159.9",
    image:
      "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Dal Makhani",
    description: "Black lentils cooked overnight with cream and butter",
    price: "₹149.9",
    image:
      "https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    name: "Butter Naan",
    description: "Soft flatbread brushed with ghee and herbs",
    price: "₹499",
    image:
      "https://media.istockphoto.com/id/1250567402/photo/table-top-view-of-indian-food.jpg?b=1&s=612x612&w=0&k=20&c=n2bAkONqFXuAYC6yW3xcxyZbl22OQLlqUiUYWwL2pRE=",
  },
  {
    id: 5,
    name: "Biryani",
    description: "Fragrant rice with tender meat and aromatic spices",
    price: "₹199.9",
    image:
      "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    name: "Rogan Josh",
    description: "Slow-cooked lamb in rich spiced gravy",
    price: "₹219.9",
    image:
      "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
      mass: 0.8,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.8,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.8,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.1,
    boxShadow: "0px 8px 24px rgba(255, 183, 0, 0.4)",
    backgroundColor: "#e6b800",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
};

export const MenuSection = () => {
  return (
    <section className="py-12 md:py-24 bg-deep-brown/95 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <p className="text-gold-crayola font-forum text-base md:text-lg mb-4 tracking-wide">
            Special Selection
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-forum text-white mb-6 font-bold">
            Delicious Menu
          </h2>
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:max-w-5xl mx-auto"
        >
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <Card className="bg-deep-brown/50 border border-gold-crayola/20 hover:shadow-lg hover:shadow-gold-crayola/20 transition-all duration-300">
                <CardBody className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6">
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover flex-shrink-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                      <h3 className="text-lg sm:text-xl font-forum text-gold-crayola font-semibold">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-xl sm:text-2xl font-forum text-gold-crayola whitespace-nowrap font-bold">
                    {item.price}
                  </span>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Order Now Button */}
        <motion.div
          className="flex justify-center mt-12 md:mt-16"
          variants={{
            hidden: { opacity: 0, y: 100, scale: 0.8 },
            show: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
                duration: 0.8,
                ease: "easeOut",
              },
            },
            hover: {
              scale: 1.1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 15,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          whileHover="hover"
        >
          <Link to="/menu">
            <Button
              size="lg"
              className="bg-gold-crayola text-deep-brown font-forum text-lg px-8 py-3 rounded-full border-2 border-gold-crayola/50 hover:bg-deep-brown hover:text-gold-crayola transition-colors duration-300"
              endContent={<Icon icon="lucide:arrow-right" className="ml-2" />}
            >
              Order Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
