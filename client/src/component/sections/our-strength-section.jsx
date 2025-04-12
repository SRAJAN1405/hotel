import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

const features = [
  {
    icon: "lucide:utensils",
    title: "Hygienic Food",
    description: "Prepared with the highest standards of cleanliness.",
  },
  {
    icon: "lucide:wind",
    title: "Fresh Environment",
    description: "A serene and airy ambiance for a delightful experience.",
  },
  {
    icon: "lucide:chef-hat",
    title: "Skilled Chefs",
    description: "Culinary experts crafting dishes with passion and precision.",
  },
  {
    icon: "lucide:party-popper",
    title: "Event & Party",
    description: "Perfect venue for celebrations and memorable gatherings.",
  },
];

// Animation Variants
const headerVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.85, rotate: 5 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 130,
      damping: 15,
      mass: 0.7,
    },
  },
  hover: {
    scale: 1.05,
    rotate: 2,
    boxShadow: "0px 6px 12px rgba(207, 143, 45, 0.15)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -270 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.2,
    rotate: 10,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
  },
};

export const Features = () => {
  return (
    <section
      className="py-12 md:py-24 bg-gradient-to-br from-[#3C2F2F] to-[#2E2525] relative overflow-hidden"
      aria-label="features"
    >
      {/* Subtle Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(207,143,45,0.1),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <motion.p
            variants={textVariants}
            className="text-amber-400 font-forum text-lg md:text-xl mb-4 tracking-wider uppercase"
          >
            Why Choose Us
          </motion.p>
          <motion.h2
            variants={textVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-forum text-white font-extrabold drop-shadow-md"
          >
            Our Strengths
          </motion.h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover="hover"
              className="group"
            >
              <Card className="bg-[#4A3C3C]/90 rounded-xl backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300">
                <CardBody className="text-center p-6 sm:p-8">
                  <motion.div
                    variants={iconVariants}
                    initial="hidden"
                    whileInView="show"
                    whileHover="hover"
                    viewport={{ once: true }}
                    className="mb-6 flex justify-center"
                  >
                    <Icon
                      icon={feature.icon}
                      className="text-5xl text-amber-400 group-hover:text-amber-300 transition-colors duration-300"
                    />
                  </motion.div>
                  <motion.h3
                    variants={textVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-xl sm:text-2xl font-forum text-amber-400 font-semibold mb-3"
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p
                    variants={textVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-gray-200 text-sm sm:text-base leading-relaxed font-light"
                  >
                    {feature.description}
                  </motion.p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};


