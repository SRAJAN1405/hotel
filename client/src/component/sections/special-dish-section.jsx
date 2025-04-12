import React from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

export const SpecialDishSection = () => {
  return (
    <section className="relative py-24 bg-deep-brown overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src="https://img.heroui.chat/image/food?w=600&h=800&u=31"
              alt="Special Dish"
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute -bottom-8 -right-8 bg-gold-crayola p-6 w-32 h-32 flex flex-col items-center justify-center">
              <span className="text-deep-brown text-3xl font-bold line-through">
                ₹400
              </span>
              <span className="text-deep-brown text-4xl font-bold">₹200</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <p className="text-gold-crayola font-forum text-lg mb-4">
              Special Dish
            </p>
            <h2 className="text-4xl md:text-5xl font-forum text-white mb-6">
              Butter Chicken
            </h2>
            <p className="text-white/80 mb-8">
              Our signature dish features tender chicken pieces marinated in
              aromatic spices, cooked to perfection in a rich, creamy tomato
              sauce. Served with butter naan and saffron rice.
            </p>
            <Button
              color="warning"
              variant="solid"
              size="lg"
              radius="none"
              className="mx-auto lg:mx-0"
            >
              View Menu Item
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
