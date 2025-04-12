import React from "react";
import { Card, CardBody, Avatar } from "@heroui/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export const TestimonialSection = () => {
  return (
    <section className="py-24 bg-deep-brown relative">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('https://img.heroui.chat/image/food?w=1920&h=1080&u=51')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <Icon
            icon="lucide:quote"
            className="w-16 h-16 text-gold-crayola mx-auto mb-8"
          />

          <p className="text-2xl md:text-3xl font-forum text-white mb-8">
            "I wanted to thank you for inviting me down for that amazing dinner
            the other night. The food was extraordinary and the authentic Indian
            flavors took me right back to my childhood memories."
          </p>

          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 border border-gold-crayola transform rotate-45"
              />
            ))}
          </div>

          <div className="flex flex-col items-center">
            <Avatar
              src="https://img.heroui.chat/image/avatar?w=100&h=100&u=1"
              className="w-20 h-20 mb-4"
            />
            <p className="text-gold-crayola font-forum text-xl">Raj Patel</p>
            <p className="text-white/60">Food Critic</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;