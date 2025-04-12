import React from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";

const AboutSection = () => {
  // Animation Variants
  const textVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.85, rotate: 5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 1, ease: [0.6, -0.05, 0.01, 0.99] },
    },
    hover: {
      scale: 1.05,
      rotate: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const tiltImageVariants = {
    hidden: { opacity: 0, x: 50, rotate: 15 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 5,
      transition: { delay: 0.4, duration: 0.9, ease: "easeOut" },
    },
    hover: {
      rotate: -5,
      transition: { duration: 0.5, type: "spring", stiffness: 100 },
    },
  };

  // Removed buttonVariants since it's no longer needed

  return (
    <section className="py-24 bg-gradient-to-br from-[#3C2F2F] to-[#2E2525] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(207,143,45,0.1),transparent_70%)] pointer-events-none" />
      <div className="container mx-auto px-4">
        {/* First Content Block (Our Legacy) - Image on Right */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            className="text-center lg:text-left"
            initial="hidden"
            whileInView="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            <motion.p
              variants={textVariants}
              className="text-amber-400 font-forum text-xl tracking-wide mb-4"
            >
              Our Legacy
            </motion.p>
            <motion.h2
              variants={textVariants}
              className="text-4xl md:text-5xl font-forum text-white font-bold mb-6 leading-tight"
            >
              Every Flavor Weaves a Tale
            </motion.h2>
            <motion.p
              variants={textVariants}
              className="text-gray-200 text-lg max-w-md mx-auto lg:mx-0 mb-8"
            >
              For over two decades, we’ve perfected the art of Indian cuisine,
              blending authentic flavors with time-honored traditions. Our
              chefs, masters of their craft, use premium ingredients and
              aromatic spices to create unforgettable dishes.
            </motion.p>
            <motion.div variants={textVariants} className="mb-8">
              <p className="text-amber-400 font-semibold mb-2">
                Reserve by Phone
              </p>
              <a
                href="tel:+804001234567"
                className="text-2xl font-forum text-white hover:text-amber-300 transition-colors duration-300"
              >
                +80 (400) 123 4567
              </a>
            </motion.div>
            {/* Removed motion.div wrapper and buttonVariants */}
            <Button
              color="warning"
              variant="solid"
              size="lg"
              radius="md"
              className="mx-auto lg:mx-0 bg-amber-600 text-white transition-all duration-300 shadow-md"
            >
              Discover More
            </Button>
          </motion.div>

          <div className="relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={imageVariants}
              whileHover="hover"
            >
              <img
                src="https://img.heroui.chat/image/food?w=570&h=570&u=24"
                alt="About Us"
                className="w-full rounded-xl shadow-2xl border border-amber-500/20"
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-12 -left-12 w-64 h-64"
              initial="hidden"
              whileInView="visible"
              variants={tiltImageVariants}
              whileHover="hover"
            >
              <img
                src="https://img.heroui.chat/image/food?w=285&h=285&u=25"
                alt="Decoration"
                className="w-full h-full object-cover rounded-xl shadow-xl border border-amber-500/20"
              />
            </motion.div>
          </div>
        </div>

        {/* Second Content Block (Our Craftsmanship) - Image on Left */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={imageVariants}
              whileHover="hover"
            >
              <img
                src="https://img.heroui.chat/image/food?w=570&h=570&u=26"
                alt="Our Chefs"
                className="w-full rounded-xl shadow-2xl border border-amber-500/20"
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-12 -right-12 w-64 h-64"
              initial="hidden"
              whileInView="visible"
              variants={tiltImageVariants}
              whileHover="hover"
            >
              <img
                src="https://img.heroui.chat/image/food?w=285&h=285&u=27"
                alt="Chef Detail"
                className="w-full h-full object-cover rounded-xl shadow-xl border border-amber-500/20"
              />
            </motion.div>
          </div>

          <motion.div
            className="text-center lg:text-left"
            initial="hidden"
            whileInView="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            <motion.p
              variants={textVariants}
              className="text-amber-400 font-forum text-xl tracking-wide mb-4"
            >
              Our Craftsmanship
            </motion.p>
            <motion.h2
              variants={textVariants}
              className="text-4xl md:text-5xl font-forum text-white font-bold mb-6 leading-tight"
            >
              Masters of Culinary Art
            </motion.h2>
            <motion.p
              variants={textVariants}
              className="text-gray-200 text-lg max-w-md mx-auto lg:mx-0 mb-8"
            >
              Our chefs are the heart of our kitchen, blending expertise with
              creativity to elevate every dish. With decades of experience, they
              transform traditional Indian recipes into extraordinary culinary
              masterpieces.
            </motion.p>
            <motion.div variants={textVariants} className="mb-8">
              <p className="text-amber-400 font-semibold mb-2">Meet Our Team</p>
              <a
                href="tel:+804009876543"
                className="text-2xl font-forum text-white hover:text-amber-300 transition-colors duration-300"
              >
                +80 (400) 987 6543
              </a>
            </motion.div>
            {/* Removed motion.div wrapper and buttonVariants */}
            <Button
              color="warning"
              variant="solid"
              size="lg"
              radius="md"
              className="mx-auto lg:mx-0 bg-amber-600 text-white transition-all duration-300 shadow-md"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
